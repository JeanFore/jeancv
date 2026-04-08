import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const { data, t } = useLanguage();
  const contact = data.contact;

  return (
    <section id="contact" style={{ padding: '8rem 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t('contact')}
          </motion.h2>
          <p style={{ color: 'var(--fg-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            {t('contactSubtitle')}
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '1.5rem', 
            gridAutoRows: 'minmax(220px, auto)' 
          }}
        >
          {/* LOCATION BLOCK - Spans 2 Rows */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ 
              gridColumn: 'span 5', 
              gridRow: 'span 2',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Visual Radar Animation */}
            <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <motion.div 
                 animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--accent-dev)' }}
               />
               <motion.div 
                 animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', border: '1px solid var(--accent-dev)' }}
               />
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-dev)', boxShadow: '0 0 30px var(--accent-dev-glow)' }}>
                  <MapPin size={28} color="var(--accent-dev)" />
               </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'var(--fg-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                 Ubicación Base
              </p>
              <h3 style={{ color: 'var(--fg)', fontSize: '1.4rem', lineHeight: 1.4, fontWeight: 700 }}>
                 {contact.address}
              </h3>
            </div>
          </motion.div>

          {/* PHONE BLOCK 1 (COL) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ 
              gridColumn: 'span 3', 
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            whileHover={{ y: -5, borderColor: 'var(--accent-dev)', boxShadow: '0 10px 30px var(--accent-dev-glow)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
               <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <Phone size={24} color="var(--fg)" />
               </div>
               <span style={{ fontWeight: 600, color: 'var(--fg-secondary)', letterSpacing: '0.05em' }}>{contact.phones[0].label}</span>
            </div>
            <a href={`tel:${contact.phones[0].number.replace(/\s+/g, '')}`} style={{ color: 'var(--fg)', fontSize: '1.4rem', fontWeight: 700, textDecoration: 'none' }}>
              {contact.phones[0].number}
            </a>
          </motion.div>

          {/* PHONE BLOCK 2 (MX) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass"
            style={{ 
              gridColumn: 'span 4', 
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            whileHover={{ y: -5, borderColor: 'var(--accent-admin)', boxShadow: '0 10px 30px var(--accent-admin-glow)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
               <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <Phone size={24} color="var(--fg)" />
               </div>
               <span style={{ fontWeight: 600, color: 'var(--fg-secondary)', letterSpacing: '0.05em' }}>{contact.phones[1].label}</span>
            </div>
            <a href={`tel:${contact.phones[1].number.replace(/\s+/g, '')}`} style={{ color: 'var(--fg)', fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none' }}>
              {contact.phones[1].number}
            </a>
          </motion.div>

          {/* SOCIAL LINKS BLOCK */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass"
            style={{ 
              gridColumn: 'span 7', 
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.8), rgba(10, 10, 15, 0.9))'
            }}
          >
            {/* GMAIL */}
            <a 
              href={`mailto:${contact.email}`} 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--fg)', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#EA4335'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
            >
               <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                    dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path> <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335"></path> <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05"></path> <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853"></path> <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F"></path> <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F"></path> <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F"></path> <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4"></path> </g></svg>` }}
               />
               <div>
                 <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.2rem' }}>Gmail</p>
                 <p style={{ color: 'var(--fg-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Email <ExternalLink size={12} /></p>
               </div>
            </a>

            <div style={{ width: '1px', height: '60px', background: 'var(--border)' }} />

            {/* LINKEDIN */}
            <a 
              href={contact.social.linkedin} 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--fg)', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#0A66C2'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
            >
               <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                    dangerouslySetInnerHTML={{ __html: `<svg height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 382 382" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#0077B7;" d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"></path> </g></svg>` }}
               />
               <div>
                 <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.2rem' }}>LinkedIn</p>
                 <p style={{ color: 'var(--fg-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Conectar <ExternalLink size={12} /></p>
               </div>
            </a>

            <div style={{ width: '1px', height: '60px', background: 'var(--border)' }} />

            {/* GITHUB */}
            <a 
              href={contact.social.github} 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--fg)', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#3E75C3'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
            >
               <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                    dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 -0.5 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width="100%" height="100%"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Github-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-700.000000, -560.000000)" fill="#3E75C3"> <path d="M723.9985,560 C710.746,560 700,570.787092 700,584.096644 C700,594.740671 706.876,603.77183 716.4145,606.958412 C717.6145,607.179786 718.0525,606.435849 718.0525,605.797328 C718.0525,605.225068 718.0315,603.710086 718.0195,601.699648 C711.343,603.155898 709.9345,598.469394 709.9345,598.469394 C708.844,595.686405 707.2705,594.94548 707.2705,594.94548 C705.091,593.450075 707.4355,593.480194 707.4355,593.480194 C709.843,593.650366 711.1105,595.963499 711.1105,595.963499 C713.2525,599.645538 716.728,598.58234 718.096,597.964902 C718.3135,596.407754 718.9345,595.346062 719.62,594.743683 C714.2905,594.135281 708.688,592.069123 708.688,582.836167 C708.688,580.205279 709.6225,578.054788 711.1585,576.369634 C710.911,575.759726 710.0875,573.311058 711.3925,569.993458 C711.3925,569.993458 713.4085,569.345902 717.9925,572.46321 C719.908,571.928599 721.96,571.662047 724.0015,571.651505 C726.04,571.662047 728.0935,571.928599 730.0105,572.46321 C734.5915,569.345902 736.603,569.993458 736.603,569.993458 C737.9125,573.311058 737.089,575.759726 736.8415,576.369634 C738.3805,578.054788 739.309,580.205279 739.309,582.836167 C739.309,592.091712 733.6975,594.129257 728.3515,594.725612 C729.2125,595.469549 729.9805,596.939353 729.9805,599.18773 C729.9805,602.408949 729.9505,605.006706 729.9505,605.797328 C729.9505,606.441873 730.3825,607.191834 731.6005,606.9554 C741.13,603.762794 748,594.737659 748,584.096644 C748,570.787092 737.254,560 723.9985,560" id="Github"> </path> </g> </g> </g></svg>` }}
               />
               <div>
                 <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.2rem' }}>GitHub</p>
                 <p style={{ color: 'var(--fg-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Repositorios <ExternalLink size={12} /></p>
               </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
