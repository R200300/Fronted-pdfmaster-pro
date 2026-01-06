
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { Annotation } from '../types';

export const processPDFEdits = async (
  originalBuffer: ArrayBuffer,
  annotations: Annotation[],
  isPro: boolean,
  pageOrder?: number[] // Array of original indices
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(originalBuffer);
  
  // Handle page rearrangement if provided
  if (pageOrder && pageOrder.length > 0) {
    const totalPages = pdfDoc.getPageCount();
    const indicesToRemove = Array.from({ length: totalPages }, (_, i) => i);
    // This is simplified: in a real app, we'd copy pages to a new doc to rearrange
    // For now, we process pages in their current order.
  }

  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return rgb(r, g, b);
  };

  for (const annotation of annotations) {
    const page = pages[annotation.pageIndex];
    if (!page) continue;

    const { width: pageWidth, height: pageHeight } = page.getSize();
    const pdfY = pageHeight - (annotation.y * pageHeight / 100);
    const pdfX = (annotation.x * pageWidth / 100);

    if (annotation.type === 'text') {
      page.drawText(annotation.content, {
        x: pdfX,
        y: pdfY - annotation.fontSize,
        size: annotation.fontSize,
        font: helveticaFont,
        color: hexToRgb(annotation.color),
      });
    } else if (annotation.type === 'image') {
      try {
        const imageBytes = await fetch(annotation.dataUrl).then((res) => res.arrayBuffer());
        const isPng = annotation.dataUrl.includes('image/png');
        const embeddedImage = isPng ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);
        
        const imgWidth = (annotation.width! * pageWidth / 100);
        const imgHeight = (annotation.height! * pageHeight / 100);

        page.drawImage(embeddedImage, {
          x: pdfX,
          y: pdfY - imgHeight,
          width: imgWidth,
          height: imgHeight,
          rotate: degrees(annotation.rotation || 0),
        });
      } catch (e) {
        console.error("Embedding failed", e);
      }
    } else if (annotation.type === 'drawing') {
      if (annotation.points.length < 2) continue;
      for (let i = 0; i < annotation.points.length - 1; i++) {
        const p1 = annotation.points[i];
        const p2 = annotation.points[i+1];
        page.drawLine({
          start: { x: (p1.x * pageWidth / 100), y: pageHeight - (p1.y * pageHeight / 100) },
          end: { x: (p2.x * pageWidth / 100), y: pageHeight - (p2.y * pageHeight / 100) },
          thickness: annotation.thickness,
          color: hexToRgb(annotation.color),
          opacity: annotation.opacity || 1,
        });
      }
    } else if (annotation.type === 'shape') {
      const w = (annotation.width || 10) * pageWidth / 100;
      const h = (annotation.height || 10) * pageHeight / 100;
      
      if (annotation.shapeType === 'rectangle') {
        page.drawRectangle({
          x: pdfX,
          y: pdfY - h,
          width: w,
          height: h,
          borderColor: hexToRgb(annotation.color),
          borderWidth: annotation.thickness,
        });
      } else if (annotation.shapeType === 'circle') {
        page.drawEllipse({
          x: pdfX + w/2,
          y: pdfY - h/2,
          xScale: w/2,
          yScale: h/2,
          borderColor: hexToRgb(annotation.color),
          borderWidth: annotation.thickness,
        });
      }
    }
  }

  if (!isPro) {
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      page.drawText('Edited with PDFMaster Pro Free', {
        x: width / 2 - 100,
        y: 20,
        size: 12,
        font: helveticaBold,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.4,
      });
    });
  }

  return await pdfDoc.save();
};
