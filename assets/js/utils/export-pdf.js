/* ==========================================================================
   EXPORT PDF - Matemáticas Avanzadas
   Generación de PDFs para certificados, lecciones, resúmenes
   Usa jsPDF + html2canvas (carga dinámica)
   ========================================================================== */

/* ==========================================================================
   CONFIGURACIÓN
   ========================================================================== */
const PDF_CONFIG = {
  // Formatos de página
  formats: {
    certificate: { orientation: 'landscape', unit: 'mm', format: 'a4' },
    lesson: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    summary: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    progress: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  },
  
  // Márgenes (mm)
  margins: {
    certificate: { top: 15, right: 15, bottom: 15, left: 15 },
    lesson: { top: 20, right: 20, bottom: 20, left: 20 },
    summary: { top: 20, right: 20, bottom: 20, left: 20 }
  },
  
  // Calidad de imagen
  imageScale: 2,
  imageQuality: 0.95
};

/* ==========================================================================
   CARGA DINÁMICA DE DEPENDENCIAS
   ========================================================================== */
let jsPDFLoaded = false;
let html2canvasLoaded = false;

async function loadDependencies() {
  const jspdfName = 'jspdf';
  const html2canvasName = 'html2canvas';
  if (!jsPDFLoaded) {
    try {
      const m = await import(jspdfName);
      window.jsPDF = m.default;
      jsPDFLoaded = true;
    } catch (e) {
      console.warn('[ExportPDF] jspdf not available');
    }
  }
  if (!html2canvasLoaded) {
    try {
      const m = await import(html2canvasName);
      window.html2canvas = m.default;
      html2canvasLoaded = true;
    } catch (e) {
      console.warn('[ExportPDF] html2canvas not available');
    }
  }
}

/* ==========================================================================
   GENERADORES PRINCIPALES
   ========================================================================== */

/**
 * Generar PDF desde elemento HTML
 * @param {HTMLElement} element - Elemento a convertir
 * @param {Object} options - Opciones de jsPDF
 * @returns {Promise<jsPDF>} Instancia de jsPDF
 */
export async function generatePDFFromElement(element, options = {}) {
  await loadDependencies();
  
  const { jsPDF, html2canvas } = window;
  const config = { ...PDF_CONFIG.formats.certificate, ...options.format };
  const margins = options.margins || PDF_CONFIG.margins.certificate;
  
  const pdf = new jsPDF(config);
  
  // Renderizar elemento a canvas
  const canvas = await html2canvas(element, {
    scale: options.scale || PDF_CONFIG.imageScale,
    useCORS: true,
    logging: false,
    backgroundColor: options.backgroundColor || (config.orientation === 'landscape' ? '#0f172a' : '#ffffff'),
    onclone: (clonedDoc) => {
      // Ocultar elementos no deseados en el clon
      clonedDoc.querySelectorAll('.no-print, .certificate-actions, button, .btn').forEach(el => {
        el.style.display = 'none !important';
      });
    }
  });
  
  const imgData = canvas.toDataURL('image/png', options.quality || PDF_CONFIG.imageQuality);
  
  // Calcular dimensiones
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(
    (pdfWidth - margins.left - margins.right) / imgWidth,
    (pdfHeight - margins.top - margins.bottom) / imgHeight
  );
  
  const finalWidth = imgWidth * ratio;
  const finalHeight = imgHeight * ratio;
  const x = (pdfWidth - finalWidth) / 2;
  const y = (pdfHeight - finalHeight) / 2;
  
  pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
  
  return pdf;
}

/**
 * Generar PDF de certificado
 * @param {Object} certificateData - Datos del certificado
 * @param {HTMLElement} certificateElement - Elemento DOM del certificado (opcional)
 * @returns {Promise<Blob>} Blob del PDF
 */
export async function generateCertificatePDF(certificateData, certificateElement = null) {
  if (certificateElement) {
    const pdf = await generatePDFFromElement(certificateElement, {
      format: PDF_CONFIG.formats.certificate,
      margins: PDF_CONFIG.margins.certificate,
      backgroundColor: certificateData.template === 'modern' ? '#0f172a' : '#ffffff'
    });
    return pdf.output('blob');
  }
  
  // Generar desde datos (fallback)
  return generateCertificateFromData(certificateData);
}

/**
 * Generar certificado PDF desde datos puros (sin elemento DOM)
 */
async function generateCertificateFromData(cert) {
  await loadDependencies();
  const { jsPDF } = window;
  
  const pdf = new jsPDF(PDF_CONFIG.formats.certificate);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  
  // Colores
  const primaryColor = [34/255, 211/255, 238/255]; // #22d3ee
  const secondaryColor = [168/255, 85/255, 247/255]; // #a855f7
  const textColor = [15/255, 23/255, 42/255]; // #0f172a
  const mutedColor = [100/255, 116/255, 139/255]; // #64748b
  
  // Fondo
  if (cert.template === 'modern') {
    pdf.setFillColor(15, 23, 42); // #0f172a
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  }
  
  // Borde decorativo
  pdf.setDrawColor(...primaryColor.map(c => c * 255));
  pdf.setLineWidth(1.5);
  pdf.roundedRect(margin, margin, pageWidth - 2*margin, pageHeight - 2*margin, 5, 5);
  
  // Logo/Título
  pdf.setFontSize(28);
  pdf.setTextColor(...primaryColor.map(c => c * 255));
  pdf.setFont('helvetica', 'bold');
  
  const typeLabels = {
    module: 'Certificado de Módulo',
    phase: 'Certificado de Fase',
    course: 'Diploma de Curso Completo',
    mastery: 'Certificado de Maestría'
  };
  
  const title = typeLabels[cert.type] || 'Certificado';
  pdf.text(title, pageWidth / 2, margin + 20, { align: 'center' });
  
  // Subtítulo
  pdf.setFontSize(14);
  pdf.setTextColor(...mutedColor.map(c => c * 255));
  pdf.setFont('helvetica', 'normal');
  
  const subtitles = {
    module: `Módulo completado: ${cert.moduleTitle || 'Módulo'}`,
    phase: `Fase completada: ${cert.phaseTitle || 'Fase'}`,
    course: 'Curso profesional de matemáticas avanzadas',
    mastery: `Maestría en: ${cert.moduleTitle || 'Tema'}`
  };
  
  pdf.text(subtitles[cert.type] || 'Certificado de logro', pageWidth / 2, margin + 32, { align: 'center' });
  
  // Nombre del estudiante
  pdf.setFontSize(32);
  pdf.setTextColor(...primaryColor.map(c => c * 255));
  pdf.setFont('helvetica', 'bold');
  pdf.text(cert.studentName || 'Estudiante', pageWidth / 2, pageHeight / 2 - 10, { align: 'center' });
  
  // Logro
  pdf.setFontSize(16);
  pdf.setTextColor(...textColor.map(c => c * 255));
  pdf.setFont('helvetica', 'normal');
  
  const achievements = {
    module: `Has completado con éxito el módulo "${cert.moduleTitle || 'Módulo'}"`,
    phase: `Has completado con maestría la fase "${cert.phaseTitle || 'Fase'}"`,
    course: 'Has completado todo el currículo de matemáticas avanzadas',
    mastery: `Has demostrado dominio experto en "${cert.moduleTitle || 'Tema'}"`
  };
  
  const lines = pdf.splitTextToSize(achievements[cert.type] || '', pageWidth - 2*margin - 20);
  pdf.text(lines, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });
  
  // Puntuación si existe
  if (cert.score) {
    pdf.setFontSize(14);
    pdf.setTextColor(...mutedColor.map(c => c * 255));
    pdf.text(`Puntuación: ${cert.score}%`, pageWidth / 2, pageHeight / 2 + 15 + lines.length * 7, { align: 'center' });
  }
  
  // Footer
  const footerY = pageHeight - margin - 25;
  
  // Fecha
  pdf.setFontSize(9);
  pdf.setTextColor(...mutedColor.map(c => c * 255));
  pdf.setFont('helvetica', 'bold');
  pdf.text('FECHA:', margin + 10, footerY);
  pdf.setFont('helvetica', 'normal');
  pdf.text(formatDate(cert.completionDate || cert.earnedAt), margin + 10, footerY + 5);
  
  // QR Code placeholder (lado derecho)
  const qrSize = 25;
  const qrX = pageWidth - margin - qrSize - 10;
  const qrY = footerY - qrSize + 5;
  
  pdf.setDrawColor(...mutedColor.map(c => c * 255));
  pdf.setLineWidth(0.3);
  pdf.rect(qrX, qrY, qrSize, qrSize);
  
  pdf.setFontSize(6);
  pdf.text('VERIFICAR', qrX + qrSize/2, qrY + qrSize/2, { align: 'center' });
  
  // ID de verificación
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ID VERIFICACIÓN:', pageWidth - margin - 10, footerY, { align: 'right' });
  pdf.setFont('helvetica', 'normal');
  pdf.text(cert.verificationHash?.slice(-16) || 'N/A', pageWidth - margin - 10, footerY + 5, { align: 'right' });
  
  // Firmas
  const sigY = pageHeight - margin - 50;
  pdf.setDrawColor(...mutedColor.map(c => c * 255));
  pdf.setLineWidth(0.2);
  
  // Firma izquierda
  pdf.line(margin + 20, sigY, margin + 100, sigY);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Sistema de Verificación', margin + 60, sigY + 4, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.text('Matemáticas Avanzadas', margin + 60, sigY + 9, { align: 'center' });
  
  // Firma derecha
  pdf.line(pageWidth - margin - 100, sigY, pageWidth - margin - 20, sigY);
  pdf.setFont('helvetica', 'bold');
  pdf.text(cert.studentName || 'Estudiante', pageWidth - margin - 60, sigY + 4, { align: 'center' });
  pdf.setFont('helvetica', 'normal');
  pdf.text('Estudiante', pageWidth - margin - 60, sigY + 9, { align: 'center' });
  
  return pdf.output('blob');
}

/**
 * Generar PDF de lección completa
 * @param {Object} lessonData - Datos de la lección
 * @returns {Promise<Blob>} Blob del PDF
 */
export async function generateLessonPDF(lessonData) {
  await loadDependencies();
  const { jsPDF } = window;
  
  const pdf = new jsPDF(PDF_CONFIG.formats.lesson);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  
  const textColor = [15/255, 23/255, 42/255];
  const mutedColor = [100/255, 116/255, 139/255];
  const primaryColor = [34/255, 211/255, 238/255];
  
  // Título
  pdf.setFontSize(24);
  pdf.setTextColor(...textColor);
  pdf.setFont('helvetica', 'bold');
  const titleLines = pdf.splitTextToSize(lessonData.title || 'Lección', pageWidth - 2*margin);
  pdf.text(titleLines, margin, y);
  y += titleLines.length * 12 + 10;
  
  // Subtítulo
  if (lessonData.subtitle) {
    pdf.setFontSize(14);
    pdf.setTextColor(...mutedColor);
    pdf.setFont('helvetica', 'normal');
    const subLines = pdf.splitTextToSize(lessonData.subtitle, pageWidth - 2*margin);
    pdf.text(subLines, margin, y);
    y += subLines.length * 8 + 10;
  }
  
  // Meta
  pdf.setFontSize(10);
  pdf.setTextColor(...mutedColor);
  pdf.setFont('helvetica', 'normal');
  const meta = [
    `Módulo: ${lessonData.moduleTitle || ''}`,
    `Fase: ${lessonData.phaseTitle || ''}`,
    `Fecha: ${formatDate(lessonData.date || Date.now())}`,
    `Tiempo estimado: ${lessonData.estimatedTime || 'N/A'} min`
  ].filter(Boolean).join('  |  ');
  pdf.text(meta, margin, y);
  y += 15;
  
  // Línea separadora
  pdf.setDrawColor(...primaryColor.map(c => c * 255));
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, pageWidth - margin, y);
  y += 10;
  
  // Contenido
  if (lessonData.sections) {
    for (const section of lessonData.sections) {
      // Verificar espacio
      if (y > pageHeight - margin - 30) {
        pdf.addPage();
        y = margin;
      }
      
      // Título de sección
      pdf.setFontSize(16);
      pdf.setTextColor(...textColor);
      pdf.setFont('helvetica', 'bold');
      const secTitleLines = pdf.splitTextToSize(section.title, pageWidth - 2*margin);
      pdf.text(secTitleLines, margin, y);
      y += secTitleLines.length * 10 + 5;
      
      // Contenido
      if (section.content) {
        pdf.setFontSize(11);
        pdf.setTextColor(...textColor);
        pdf.setFont('helvetica', 'normal');
        const contentLines = pdf.splitTextToSize(section.content, pageWidth - 2*margin);
        pdf.text(contentLines, margin, y);
        y += contentLines.length * 6 + 8;
      }
      
      // Fórmulas (como texto)
      if (section.formulas) {
        pdf.setFontSize(10);
        pdf.setTextColor(...mutedColor);
        pdf.setFont('courier', 'normal');
        for (const formula of section.formulas) {
          if (y > pageHeight - margin - 20) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(`$$ ${formula} $$`, margin + 10, y);
          y += 8;
        }
        y += 5;
      }
    }
  }
  
  // Número de página
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(...mutedColor);
    pdf.text(`Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  return pdf.output('blob');
}

/**
 * Generar PDF de resumen de progreso
 */
export async function generateProgressPDF(progressData) {
  await loadDependencies();
  const { jsPDF } = window;
  
  const pdf = new jsPDF(PDF_CONFIG.formats.summary);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  
  const textColor = [15/255, 23/255, 42/255];
  const mutedColor = [100/255, 116/255, 139/255];
  const primaryColor = [34/255, 211/255, 238/255];
  const successColor = [16/255, 185/255, 129/255];
  
  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(...textColor);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Resumen de Progreso', margin, y);
  y += 15;
  
  pdf.setFontSize(12);
  pdf.setTextColor(...mutedColor);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Estudiante: ${progressData.studentName || 'Estudiante'}`, margin, y);
  y += 6;
  pdf.text(`Fecha: ${formatDate(progressData.date || Date.now())}`, margin, y);
  y += 10;
  
  // Stats principales
  pdf.setFontSize(14);
  pdf.setTextColor(...textColor);
  pdf.setFont('helvetica', 'bold');
  
  const stats = [
    { label: 'Módulos completados', value: progressData.modulesCompleted || 0, color: primaryColor },
    { label: 'Fases completadas', value: progressData.phasesCompleted || 0, color: successColor },
    { label: 'Puntuación media', value: `${progressData.averageScore || 0}%`, color: primaryColor },
    { label: 'Tiempo total', value: formatTime(progressData.totalTime || 0), color: successColor },
    { label: 'Racha actual', value: `${progressData.streak || 0} días`, color: primaryColor },
    { label: 'XP total', value: progressData.totalXP || 0, color: successColor }
  ];
  
  const colWidth = (pageWidth - 2*margin) / 3;
  for (let i = 0; i < stats.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = margin + col * colWidth;
    const statY = y + row * 30;
    
    if (statY > pageHeight - margin - 30) {
      pdf.addPage();
      y = margin;
      // Recalcular
      const newCol = i % 3;
      const newRow = Math.floor(i / 3);
      const newX = margin + newCol * colWidth;
      const newY = y + newRow * 30;
      drawStat(pdf, newX, newY, stats[i], colWidth, primaryColor, successColor, textColor, mutedColor);
    } else {
      drawStat(pdf, x, statY, stats[i], colWidth, primaryColor, successColor, textColor, mutedColor);
    }
  }
  
  y += 70;
  
  // Progreso por fase
  if (progressData.phaseProgress) {
    if (y > pageHeight - margin - 50) {
      pdf.addPage();
      y = margin;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Progreso por Fase', margin, y);
    y += 12;
    
    for (const [phaseId, phaseData] of Object.entries(progressData.phaseProgress)) {
      if (y > pageHeight - margin - 20) {
        pdf.addPage();
        y = margin;
      }
      
      pdf.setFontSize(11);
      pdf.setTextColor(...textColor);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Fase ${parseInt(phaseId)+1}: ${phaseData.title || ''}`, margin, y);
      y += 7;
      
      // Barra de progreso
      const barWidth = pageWidth - 2*margin - 10;
      const barHeight = 6;
      const progress = phaseData.percentage || 0;
      
      pdf.setDrawColor(...mutedColor.map(c => c * 255));
      pdf.setLineWidth(0.3);
      pdf.rect(margin + 5, y, barWidth, barHeight);
      
      pdf.setFillColor(...primaryColor.map(c => c * 255));
      pdf.rect(margin + 5, y, barWidth * progress / 100, barHeight, 'F');
      
      pdf.setFontSize(9);
      pdf.setTextColor(...mutedColor);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${progress}%`, margin + barWidth + 10, y + 4);
      
      y += 12;
    }
  }
  
  // Certificados ganados
  if (progressData.certificates && progressData.certificates.length > 0) {
    if (y > pageHeight - margin - 40) {
      pdf.addPage();
      y = margin;
    }
    
    pdf.setFontSize(16);
    pdf.setTextColor(...textColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Certificados Obtenidos', margin, y);
    y += 12;
    
    pdf.setFontSize(10);
    pdf.setTextColor(...mutedColor);
    pdf.setFont('helvetica', 'normal');
    
    for (const cert of progressData.certificates) {
      if (y > pageHeight - margin - 15) {
        pdf.addPage();
        y = margin;
      }
      
      const typeIcon = { module: '📄', phase: '🏆', course: '🎓', mastery: '⭐' };
      const icon = typeIcon[cert.type] || '📄';
      pdf.text(`${icon} ${cert.title || cert.type} - ${formatDate(cert.earnedAt)}`, margin + 5, y);
      y += 7;
    }
  }
  
  // Footer con numeración
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(...mutedColor);
    pdf.text(`Matemáticas Avanzadas - Resumen de Progreso - Página ${i} de ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  return pdf.output('blob');
}

/* ==========================================================================
   FUNCIONES AUXILIARES
   ========================================================================== */

function drawStat(pdf, x, y, stat, width, primaryColor, successColor, textColor, mutedColor) {
  const color = stat.color === primaryColor ? primaryColor : successColor;
  
  // Valor
  pdf.setFontSize(20);
  pdf.setTextColor(...color.map(c => c * 255));
  pdf.setFont('helvetica', 'bold');
  pdf.text(stat.value.toString(), x + width/2, y, { align: 'center' });
  
  // Etiqueta
  pdf.setFontSize(9);
  pdf.setTextColor(...mutedColor.map(c => c * 255));
  pdf.setFont('helvetica', 'normal');
  const labelLines = pdf.splitTextToSize(stat.label, width - 10);
  pdf.text(labelLines, x + width/2, y + 8, { align: 'center' });
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/* ==========================================================================
   DESCARGA DE ARCHIVOS
   ========================================================================== */

/**
 * Descargar blob como archivo
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Descargar PDF de certificado
 */
export async function downloadCertificatePDF(certificateData, certificateElement = null) {
  const blob = await generateCertificatePDF(certificateData, certificateElement);
  const filename = `certificado-${certificateData.type}-${certificateData.id || Date.now()}.pdf`;
  downloadBlob(blob, filename);
  return blob;
}

/**
 * Descargar PDF de lección
 */
export async function downloadLessonPDF(lessonData) {
  const blob = await generateLessonPDF(lessonData);
  const filename = `leccion-${lessonData.moduleId || 'lesson'}-${Date.now()}.pdf`;
  downloadBlob(blob, filename);
  return blob;
}

/**
 * Descargar PDF de progreso
 */
export async function downloadProgressPDF(progressData) {
  const blob = await generateProgressPDF(progressData);
  const filename = `progreso-${progressData.studentName || 'estudiante'}-${formatDate(Date.now()).replace(/\s+/g, '-')}.pdf`;
  downloadBlob(blob, filename);
  return blob;
}

/* ==========================================================================
   EXPORTACIONES
   ========================================================================== */

export const ExportPDF = {
  generatePDFFromElement,
  generateCertificatePDF,
  generateLessonPDF,
  generateProgressPDF,
  downloadBlob,
  downloadCertificatePDF,
  downloadLessonPDF,
  downloadProgressPDF
};

export default ExportPDF;