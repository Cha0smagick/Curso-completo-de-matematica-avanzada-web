/* ==========================================================================
   CERTIFICATE VIEW WEB COMPONENT - Matemáticas Avanzadas
   Generador de diplomas con templates SVG, PDF, QR, verificación
   ========================================================================== */

export class CertificateView extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'certificate-id', 'student-name', 'completion-date', 'verification-hash', 'template', 'download-pdf', 'shareable'];
  }
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.certType = 'module';
    this.certificateId = '';
    this.studentName = 'Estudiante';
    this.completionDate = new Date().toISOString().split('T')[0];
    this.verificationHash = '';
    this.template = 'elegant';
    this.downloadPdf = true;
    this.shareable = true;
    this.certificateData = null;
  }
  
  connectedCallback() {
    this.render();
    this.parseAttributes();
    this.loadCertificate();
  }
  
  disconnectedCallback() {
    // Cleanup
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'type':
        this.certType = newValue || 'module';
        break;
      case 'certificate-id':
        this.certificateId = newValue || '';
        this.loadCertificate();
        break;
      case 'student-name':
        this.studentName = newValue || 'Estudiante';
        this.renderCertificate();
        break;
      case 'completion-date':
        this.completionDate = newValue || new Date().toISOString().split('T')[0];
        this.renderCertificate();
        break;
      case 'verification-hash':
        this.verificationHash = newValue || '';
        break;
      case 'template':
        this.template = newValue || 'elegant';
        this.renderCertificate();
        break;
      case 'download-pdf':
        this.downloadPdf = newValue !== 'false';
        break;
      case 'shareable':
        this.shareable = newValue !== 'false';
        break;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: var(--space-8, 2rem) var(--space-4, 1rem);
          min-height: 60vh;
        }
        
        .certificate-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
        }
        
        .certificate {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 1.414; /* A4 ratio */
          border-radius: var(--radius-2xl, 1.5rem);
          box-shadow: var(--shadow-2xl, 0 25px 50px -12px rgba(0,0,0,0.5));
          overflow: hidden;
          position: relative;
          background: white;
          color: #000;
        }
        
        .certificate.elegant {
          background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
        }
        
        .certificate.modern {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          color: #f1f5f9;
        }
        
        .certificate.minimal {
          background: white;
          border: 4px solid var(--brand-primary, #22d3ee);
        }
        
        .certificate-border {
          position: absolute;
          inset: 20px;
          border: 2px solid var(--brand-primary, #22d3ee);
          border-radius: var(--radius-xl, 0.75rem);
          pointer-events: none;
        }
        
        .certificate.modern .certificate-border {
          box-shadow: inset 0 0 60px rgba(34, 211, 238, 0.1);
        }
        
        .certificate-content {
          position: relative;
          z-index: 1;
          padding: var(--space-12, 3rem) var(--space-16, 4rem);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .certificate-header {
          text-align: center;
          margin-bottom: var(--space-8, 2rem);
        }
        
        .certificate-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto var(--space-4, 1rem);
          background: var(--gradient-primary, linear-gradient(135deg, #22d3ee 0%, #a855f7 100%));
          border-radius: var(--radius-full, 9999px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-3xl, 2rem);
          color: white;
        }
        
        .certificate.modern .certificate-logo {
          box-shadow: var(--shadow-glow, 0 0 20px rgba(34, 211, 238, 0.3));
        }
        
        .certificate-title {
          font-size: var(--text-3xl, 2rem);
          font-weight: 800;
          margin-bottom: var(--space-2, 0.5rem);
          background: var(--gradient-primary, linear-gradient(135deg, #22d3ee 0%, #a855f7 100%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .certificate.modern .certificate-title {
          color: #f1f5f9;
          -webkit-text-fill-color: #f1f5f9;
        }
        
        .certificate-subtitle {
          font-size: var(--text-lg, 1.1rem);
          color: #64748b;
          margin-bottom: 0;
        }
        
        .certificate.modern .certificate-subtitle {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .certificate-body {
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-4, 1rem);
        }
        
        .certificate-presented {
          font-size: var(--text-lg, 1.1rem);
          color: #64748b;
        }
        
        .certificate.modern .certificate-presented {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .certificate-name {
          font-size: var(--text-4xl, 2.5rem);
          font-weight: 800;
          color: var(--brand-primary, #22d3ee);
          letter-spacing: 0.02em;
        }
        
        .certificate.modern .certificate-name {
          color: #f1f5f9;
        }
        
        .certificate-course {
          font-size: var(--text-xl, 1.3rem);
          color: #0f172a;
          font-weight: 600;
        }
        
        .certificate.modern .certificate-course {
          color: #f1f5f9;
        }
        
        .certificate-achievement {
          font-size: var(--text-lg, 1.1rem);
          color: #64748b;
          font-style: italic;
        }
        
        .certificate.modern .certificate-achievement {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .certificate-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: var(--space-4, 1rem);
          margin-top: var(--space-8, 2rem);
          padding-top: var(--space-6, 1.5rem);
          border-top: 1px solid #e2e8f0;
        }
        
        .certificate.modern .certificate-footer {
          border-top-color: rgba(255, 255, 255, 0.1);
        }
        
        .certificate-date,
        .certificate-id {
          font-size: var(--text-sm, 0.875rem);
          color: #64748b;
          display: flex;
          flex-direction: column;
          gap: var(--space-1, 0.25rem);
        }
        
        .certificate.modern .certificate-date,
        .certificate.modern .certificate-id {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .certificate-label {
          font-size: var(--text-xs, 0.7rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
        }
        
        .certificate-value {
          font-family: var(--font-mono, monospace);
        }
        
        .certificate-qr {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-2, 0.5rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .certificate.modern .certificate-qr {
          background: #1e293b;
        }
        
        .certificate-signatures {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: var(--space-8, 2rem);
          padding-top: var(--space-4, 1rem);
          border-top: 1px dashed #e2e8f0;
        }
        
        .certificate.modern .certificate-signatures {
          border-top-color: rgba(255, 255, 255, 0.1);
        }
        
        .certificate-signature {
          text-align: center;
          min-width: 150px;
        }
        
        .certificate-signature-line {
          width: 100%;
          height: 1px;
          background: #94a3b8;
          margin-bottom: var(--space-1, 0.25rem);
        }
        
        .certificate-signature-name {
          font-size: var(--text-sm, 0.875rem);
          font-weight: 600;
        }
        
        .certificate-signature-title {
          font-size: var(--text-xs, 0.7rem);
          color: #94a3b8;
        }
        
        /* Actions */
        .certificate-actions {
          display: flex;
          justify-content: center;
          gap: var(--space-4, 1rem);
          margin-top: var(--space-8, 2rem);
          flex-wrap: wrap;
        }
        
        .certificate-loading {
          text-align: center;
          padding: var(--space-10, 2.5rem);
          color: var(--color-text-muted, #94a3b8);
        }
        
        .certificate-loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border, #334155);
          border-top-color: var(--brand-primary, #22d3ee);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto var(--space-4, 1rem);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Verification page */
        .verification-container {
          max-width: 600px;
          margin: 0 auto;
          padding: var(--space-8, 2rem);
          text-align: center;
        }
        
        .verification-status {
          font-size: var(--text-4xl, 2.5rem);
          margin-bottom: var(--space-4, 1rem);
        }
        
        .verification-status.valid {
          color: var(--brand-success, #10b981);
        }
        
        .verification-status.invalid {
          color: var(--brand-error, #ef4444);
        }
        
        .verification-details {
          background: var(--color-surface, #1e293b);
          border: 1px solid var(--color-border, #334155);
          border-radius: var(--radius-xl, 0.75rem);
          padding: var(--space-6, 1.5rem);
          margin-top: var(--space-6, 1.5rem);
          text-align: left;
        }
        
        .verification-detail {
          display: flex;
          justify-content: space-between;
          padding: var(--space-2, 0.5rem) 0;
          border-bottom: 1px solid var(--color-border, #334155);
        }
        
        .verification-detail:last-child {
          border-bottom: none;
        }
        
        .verification-detail-label {
          color: var(--color-text-muted, #94a3b8);
        }
        
        .verification-detail-value {
          font-family: var(--font-mono, monospace);
          font-weight: 600;
        }
        
        /* Print styles */
        @media print {
          :host {
            padding: 0;
            min-height: auto;
          }
          
          .certificate-actions {
            display: none !important;
          }
          
          .certificate {
            box-shadow: none;
            border-radius: 0;
            max-width: 100%;
            aspect-ratio: auto;
            height: 297mm;
            page-break-after: always;
          }
          
          .certificate-border {
            inset: 15mm;
          }
          
          .certificate-content {
            padding: 30mm 40mm;
          }
        }
        
        /* Responsive */
        @media (max-width: 767px) {
          .certificate-content {
            padding: var(--space-8, 2rem) var(--space-6, 1.5rem);
          }
          
          .certificate-name {
            font-size: var(--text-2xl, 1.6rem);
          }
          
          .certificate-title {
            font-size: var(--text-2xl, 1.6rem);
          }
          
          .certificate-footer {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .certificate-signatures {
            flex-direction: column;
            gap: var(--space-4, 1rem);
          }
        }
      </style>
      
      <div id="certificate-content">
        <!-- Contenido dinámico -->
      </div>
    `;
  }
  
  parseAttributes() {
    this.certType = this.getAttribute('type') || 'module';
    this.certificateId = this.getAttribute('certificate-id') || '';
    this.studentName = this.getAttribute('student-name') || 'Estudiante';
    this.completionDate = this.getAttribute('completion-date') || new Date().toISOString().split('T')[0];
    this.verificationHash = this.getAttribute('verification-hash') || '';
    this.template = this.getAttribute('template') || 'elegant';
    this.downloadPdf = this.getAttribute('download-pdf') !== 'false';
    this.shareable = this.getAttribute('shareable') !== 'false';
  }
  
  async loadCertificate() {
    const container = this.shadowRoot.querySelector('#certificate-content');
    if (!container) return;
    
    container.innerHTML = `
      <div class="certificate-loading">
        <div class="certificate-loading-spinner"></div>
        <span>Cargando certificado...</span>
      </div>
    `;
    
    // Si tenemos certificateId, buscar en store
    if (this.certificateId) {
      // En una implementación real, cargar desde store
      this.certificateData = this.getMockCertificate(this.certificateId);
    } else {
      // Generar certificado nuevo
      this.certificateData = this.generateCertificate();
    }
    
    this.renderCertificate();
  }
  
  getMockCertificate(id) {
    // Mock data
    return {
      id,
      type: this.certType,
      moduleId: 'm01',
      phaseId: 0,
      earnedAt: Date.now(),
      verificationHash: this.verificationHash || this.generateHash(id),
      template: this.template,
      studentName: this.studentName,
      completionDate: this.completionDate,
      score: 95,
      data: {
        moduleTitle: 'Números Naturales',
        phaseTitle: 'Aritmética y Pre-Álgebra'
      }
    };
  }
  
  generateCertificate() {
    return {
      id: `cert-${Date.now()}`,
      type: this.certType,
      moduleId: 'm01',
      phaseId: 0,
      earnedAt: Date.now(),
      verificationHash: this.generateHash(`cert-${Date.now()}`),
      template: this.template,
      studentName: this.studentName,
      completionDate: this.completionDate,
      score: 100,
      data: {
        moduleTitle: 'Módulo Completado',
        phaseTitle: 'Fase Completada'
      }
    };
  }
  
  generateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return `sha256:${Math.abs(hash).toString(16).padStart(16, '0')}`;
  }
  
  renderCertificate() {
    const container = this.shadowRoot.querySelector('#certificate-content');
    if (!container || !this.certificateData) return;
    
    const cert = this.certificateData;
    const isModern = this.template === 'modern';
    const isMinimal = this.template === 'minimal';
    
    const moduleTitle = cert.data?.moduleTitle || 'Módulo Completado';
    const phaseTitle = cert.data?.phaseTitle || 'Fase Completada';
    const formattedDate = this.formatDate(cert.completionDate);
    
    const typeLabels = {
      module: { title: 'Certificado de Módulo', subtitle: 'Módulo completado con éxito', achievement: `Has completado: ${moduleTitle}` },
      phase: { title: 'Certificado de Fase', subtitle: 'Fase completada con maestría', achievement: `Has completado la fase: ${phaseTitle}` },
      course: { title: 'Diploma de Curso Completo', subtitle: 'Curso profesional de matemáticas avanzadas', achievement: 'Has completado todo el currículo desde fundamentos hasta temas avanzados' },
      mastery: { title: 'Certificado de Maestría', subtitle: 'Dominio experto del tema', achievement: `Has demostrado maestría en: ${moduleTitle}` }
    };
    
    const labels = typeLabels[cert.type] || typeLabels.module;
    
    container.innerHTML = `
      <div class="certificate-container">
        <div class="certificate ${this.template}" role="img" aria-label="${labels.title} para ${this.studentName}">
          <div class="certificate-border"></div>
          <div class="certificate-content">
            <div class="certificate-header">
              <div class="certificate-logo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h1 class="certificate-title">${labels.title}</h1>
              <p class="certificate-subtitle">${labels.subtitle}</p>
            </div>
            
            <div class="certificate-body">
              <p class="certificate-presented">Se otorga a</p>
              <p class="certificate-name">${this.escapeHtml(this.studentName)}</p>
              <p class="certificate-course">${labels.achievement}</p>
              <p class="certificate-achievement">${cert.score ? `Con una puntuación de ${cert.score}%` : ''}</p>
            </div>
            
            <div class="certificate-footer">
              <div class="certificate-date">
                <span class="certificate-label">Fecha</span>
                <span class="certificate-value">${formattedDate}</span>
              </div>
              <div class="certificate-qr" id="qr-code" title="Verificar certificado"></div>
              <div class="certificate-id">
                <span class="certificate-label">ID de verificación</span>
                <span class="certificate-value">${cert.verificationHash.slice(-16)}</span>
              </div>
            </div>
            
            <div class="certificate-signatures">
              <div class="certificate-signature">
                <div class="certificate-signature-line"></div>
                <div class="certificate-signature-name">Sistema de Verificación</div>
                <div class="certificate-signature-title">Matemáticas Avanzadas</div>
              </div>
              <div class="certificate-signature">
                <div class="certificate-signature-line"></div>
                <div class="certificate-signature-name">${this.escapeHtml(this.studentName)}</div>
                <div class="certificate-signature-title">Estudiante</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${(this.downloadPdf || this.shareable) ? `
        <div class="certificate-actions">
          ${this.downloadPdf ? `<button class="btn btn-primary" id="btn-download-pdf">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Descargar PDF
          </button>` : ''}
          ${this.shareable ? `<button class="btn btn-secondary" id="btn-share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Compartir
          </button>` : ''}
          <button class="btn btn-ghost" id="btn-verify">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Verificar
          </button>
        </div>
      ` : ''}
    `;
    
    // Generar QR code
    this.generateQRCode(cert.verificationHash);
    
    // Event listeners
    container.querySelector('#btn-download-pdf')?.addEventListener('click', () => this.downloadPDF());
    container.querySelector('#btn-share')?.addEventListener('click', () => this.shareCertificate());
    container.querySelector('#btn-verify')?.addEventListener('click', () => this.verifyCertificate());
  }
  
  generateQRCode(hash) {
    const qrContainer = this.shadowRoot.querySelector('#qr-code');
    if (!qrContainer) return;
    
    // Usar API de QR code simple
    const verifyUrl = `${window.location.origin}${window.location.pathname}#verify/${hash}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(verifyUrl)}`;
    
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="Código QR de verificación" style="width: 100%; height: 100%; border-radius: var(--radius-md);">`;
  }
  
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  downloadPDF() {
    // Usar impresión del navegador (sin dependencias externas)
    this.showToast('Abriendo diálogo de impresión...', 'info');
    setTimeout(() => window.print(), 100);
  }
  
  shareCertificate() {
    const cert = this.certificateData;
    const verifyUrl = `${window.location.origin}${window.location.pathname}#verify/${cert.verificationHash}`;
    const shareData = {
      title: `Certificado de ${this.getCertTypeLabel(cert.type)}`,
      text: `${this.studentName} ha completado ${this.getCertTypeLabel(cert.type)} en Matemáticas Avanzadas`,
      url: verifyUrl
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(() => this.fallbackShare(verifyUrl));
    } else {
      this.fallbackShare(verifyUrl);
    }
  }
  
  fallbackShare(url) {
    navigator.clipboard.writeText(url).then(() => {
      this.showToast('Enlace copiado al portapapeles', 'success');
    }).catch(() => {
      this.showToast('No se pudo copiar. URL: ' + url, 'info');
    });
  }
  
  verifyCertificate() {
    const cert = this.certificateData;
    const verifyUrl = `${window.location.origin}${window.location.pathname}#verify/${cert.verificationHash}`;
    window.open(verifyUrl, '_blank');
  }
  
  getCertTypeLabel(type) {
    const labels = {
      module: 'Módulo',
      phase: 'Fase',
      course: 'Curso Completo',
      mastery: 'Maestría'
    };
    return labels[type] || 'Certificado';
  }
  
  showToast(message, type = 'info') {
    // Emitir evento global
    this.dispatchEvent(new CustomEvent('show-toast', {
      detail: { message, type },
      bubbles: true,
      composed: true
    }));
  }
  
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Registrar componente
if (!customElements.get('certificate-view')) {
  customElements.define('certificate-view', CertificateView);
}

export default CertificateView;