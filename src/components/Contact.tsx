import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Phone, ExternalLink, MapPin } from 'lucide-react';
import { Globe } from './Globe';

type SocialLink = {
  name: string;
  href: string;
  hint: string;
  variant: 'gmail' | 'linkedin' | 'github';
  iconSvg: string;
};

const GMAIL_ICON_SVG = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path>
    <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335"></path>
    <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05"></path>
    <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853"></path>
    <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F"></path>
    <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F"></path>
    <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F"></path>
    <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4"></path>
  </g>
</svg>
`;

const LINKEDIN_ICON_SVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2"/>
  <circle cx="7.3" cy="8.1" r="1.3" fill="#FFFFFF"/>
  <rect x="6.1" y="10" width="2.4" height="7.8" fill="#FFFFFF"/>
  <path d="M11 10H13.2V11.1C13.7 10.4 14.7 9.8 16.1 9.8C18.9 9.8 19.7 11.7 19.7 14V17.8H17.3V14.4C17.3 13.1 17.1 12 15.8 12C14.6 12 14 12.8 13.8 13.6C13.7 13.8 13.7 14.1 13.7 14.4V17.8H11V10Z" fill="#FFFFFF"/>
</svg>
`;

const GITHUB_ICON_SVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="12" cy="12" r="10" fill="#3E75C3"/>
  <path d="M12 6.3C8.9 6.3 6.4 8.8 6.4 11.9C6.4 14.3 8 16.4 10.2 17.2C10.5 17.2 10.6 17.1 10.6 16.9V16C9 16.4 8.7 15.2 8.7 15.2C8.5 14.5 8.1 14.3 8.1 14.3C7.6 14 8.1 14 8.1 14C8.7 14.1 9 14.6 9 14.6C9.5 15.5 10.3 15.2 10.6 15.1C10.6 14.7 10.8 14.4 11 14.2C9.7 14.1 8.3 13.5 8.3 11.7C8.3 11.2 8.5 10.7 8.9 10.3C8.8 10.1 8.7 9.5 9 8.8C9 8.8 9.5 8.6 10.6 9.4C11.1 9.2 11.6 9.1 12 9.1C12.5 9.1 12.9 9.2 13.4 9.4C14.5 8.6 15 8.8 15 8.8C15.3 9.5 15.2 10.1 15.1 10.3C15.5 10.7 15.7 11.2 15.7 11.7C15.7 13.5 14.3 14.1 13 14.2C13.3 14.5 13.5 14.9 13.5 15.5V16.9C13.5 17.1 13.6 17.2 13.9 17.2C16.1 16.4 17.7 14.3 17.7 11.9C17.7 8.8 15.2 6.3 12 6.3Z" fill="#FFFFFF"/>
</svg>
`;

const WHATSAPP_ICON_SVG = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"></path>
    <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_whatsapp_contact)"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"></path>
    <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"></path>
    <defs>
      <linearGradient id="paint0_whatsapp_contact" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
        <stop stop-color="#5BD066"></stop>
        <stop offset="1" stop-color="#27B43E"></stop>
      </linearGradient>
    </defs>
  </g>
</svg>
`;

const MEXICO_FLAG_SVG = `
<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill="#006847" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h7V5H4z"></path>
    <path fill="#CE1126" d="M32 5h-7v26h7a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path>
    <path fill="#EEE" d="M11 5h14v26H11z"></path>
    <path fill="#A6D388" d="M23 18a5 5 0 1 1-10 0h-1a6 6 0 0 0 12 0h-1z"></path>
    <path d="M13.543 20.269a.498.498 0 0 0-.673-.218a.5.5 0 0 0-.219.673c.09.177.189.35.296.516v.001l.004.006v.001l.008.011v.001l.003.006l.001.002l.004.005v.001l.003.005v.002l.003.005l.001.002l.003.005l.001.002l.003.004l.002.003l.002.003l.001.003l.003.005l.001.001l.002.003l.003.006l.001.002l.003.005l.001.002l.007.01v.001l.005.007v.001c.052.077.105.151.161.226a.497.497 0 0 0 .697.101a.499.499 0 0 0 .103-.699a5.96 5.96 0 0 1-.43-.71zm-.497-1.582a5.282 5.282 0 0 1-.046-.833a.5.5 0 0 0-.485-.514l-.036.001a.5.5 0 0 0-.478.485a8.061 8.061 0 0 0-.001.311v.09l.001.005v.028l.001.003l-.001.002v.003l.001.002v.029l.001.003v.011l.001.019l.001.009v.011c.009.16.025.319.046.477a.5.5 0 0 0 .562.425a.503.503 0 0 0 .433-.567zm5.294 4.3l-.006.001l-.124.008a5.087 5.087 0 0 1-.71-.021a.5.5 0 0 0-.1.995l.125.011l.004.001l.002-.001l.003.001h.002l.006.001h.006l.003.001h.001l.006-.001l.003.001h.005l.006.001l.005.001h.013l.006.001h.013c.152.01.305.015.459.012h.039l.007-.001l.006.001h.015l.005-.001h.019l.006-.001h.001l.005.001l.001-.001l.006.001h.001l.005-.001h.008l.006-.001h.006l.001.001l.006-.001h.007l.005-.001h.02l.005-.001h.004l.004-.001l.004.001h.005l.004-.001h.005c.042-.001.085-.005.127-.007a.494.494 0 0 0 .453-.526a.493.493 0 0 0-.514-.473zm-2.439-.448a5.07 5.07 0 0 1-.724-.411a.495.495 0 0 0-.303-.087a.5.5 0 0 0-.263.911l.001.001l.006.003l.006.006l.006.004l.006.005c.266.181.548.34.842.476a.498.498 0 0 0 .663-.243a.498.498 0 0 0-.24-.665zm5.03-.398a.498.498 0 0 0-.248.08a5.142 5.142 0 0 1-.734.387a.498.498 0 0 0 .213.96a.528.528 0 0 0 .173-.038l.134-.06h.002l.006-.004l.002-.001l.004-.002h.004l.004-.002l.002-.002l.006-.001l.002-.002l.003-.002l.005-.002l.003-.001l.005-.002l.002-.001l.005-.002l.002-.001c.003-.002.003-.003.005-.003l.002-.001l.006-.003h.002l.006-.003l.006-.003l.002-.001l.005-.003l.002-.001l.006-.003l.001-.001l.007-.001l.007-.004l.002-.001l.004-.003h.002l.006-.004l.008-.002l.006-.004h.001l.007-.004l.001-.001l.014-.006l.007-.003l.014-.008l.008-.003l.006-.003h.001l.014-.008v-.001l.006-.002h.001l.022-.012l.007-.002l.014-.008l.007-.004h.001c.001-.001.003-.002.007-.002c.002-.003.004-.004.006-.005l.008-.004l.006-.003v-.001l.014-.006h.001l.007-.004l.001-.001l.005-.003h.001l.007-.004l.006-.003h.002l.006-.004v-.001l.007-.003l.001-.001l.006-.003v-.001l.006-.002l.002-.001l.004-.003l.003-.001l.005-.003l.002-.001l.005-.003l.002-.001l.006-.002c-.001-.001 0-.001.001-.001l.006-.003l.002-.001l.004-.003l.002-.001l.006-.003l.002-.001c0-.002.002-.002.004-.003l.003-.001l.004-.002l.003-.002l.004-.002l.003-.002l.003-.002l.003-.003l.005-.001l.004-.001l.002-.002l.004-.002l.004-.003l.002-.001l.004-.002l.004-.003l.003-.002c.002.001.003 0 .005-.001l.002-.002l.004-.002l.003-.002l.003-.002l.004-.002l.004-.003l.002-.001c.002-.001.006-.001.008-.003c-.002-.001-.002-.001 0-.001l.004-.002l.007-.005l.002-.001l.007-.003v-.001l.012-.006l.008-.005a.095.095 0 0 1 .02-.011h.001c.063-.038.128-.077.19-.117a.5.5 0 0 0 .152-.69a.554.554 0 0 0-.457-.225zm2.571-4.618l-.024.001a.5.5 0 0 0-.479.498c0 .277-.025.557-.072.829a.5.5 0 0 0 .987.168v-.005l.001-.002l.001-.002l-.001-.002l.001-.002v-.002l.001-.002v-.003l.001-.002v-.009c.002-.001.002-.003.002-.004v-.006a6.23 6.23 0 0 0 .052-.391l-.001-.001l.001-.003v-.001l.001-.004v-.011l.002-.003v-.001l-.001-.003v-.002l.001-.003v-.004l.002-.001l-.002-.003v-.004c.002-.001.002-.002.002-.003v-.019l.002-.003v-.001a6.22 6.22 0 0 0 .021-.495a.5.5 0 0 0-.498-.499zm-.443 2.696a.5.5 0 0 0-.68.196a4.853 4.853 0 0 1-.463.692a.5.5 0 0 0 .783.622c.116-.146.227-.299.33-.455c.002-.007.007-.014.011-.02l.001-.001l.004-.006v-.001l.004-.007c.002-.002.004-.004.004-.006l.001.001l.004-.006v-.001a.01.01 0 0 0 .003-.007l.002-.001l.004-.006v-.001c.002-.001.002-.003.003-.005l.001-.001l.004-.006l.001-.002l.002-.005l.003-.002l.002-.005h.002l.002-.006l.001-.002l.004-.004l.001-.002c.001-.002.001-.004.003-.005l.001-.003l.004-.003c0-.001 0-.002.002-.003v-.004l.003-.002l.003-.005l.001-.002l.003-.006l.002-.002l.002-.004l.002-.003c0-.001 0-.002.002-.003c0-.001 0-.002.002-.003l.003-.005l.001-.003l.002-.003l.002-.003c.002-.001.002-.002.002-.003c.002-.001.002-.002.002-.004l.002-.003l.003-.004l.003-.004v-.003l.002-.003l.003-.004l.003-.003v-.003l.004-.005v-.003c.002-.001.003-.002.003-.004l.002-.002l.002-.003l.003-.005l.002-.003v-.002l.004-.005c0-.001 0-.002.002-.003l.001-.003l.003-.004l.002-.004l.002-.003c.001-.001 0-.003.002-.004c0-.001 0-.002.002-.002l.002-.005l.002-.002l.002-.006l.002-.001l.002-.004l.002-.002l.002-.005l.002-.002l.002-.006c.002-.001 0-.002 0-.002l.004-.005l.001-.002l.004-.005v-.001l.003-.006l.002-.002l.002-.006v-.001l.005-.005l.003-.006v-.001l.004-.007l.002-.001l.025-.047a.498.498 0 0 0-.199-.672z" fill="#5C913B"></path>
    <ellipse fill="#55ACEE" cx="18" cy="21" rx="3" ry="1"></ellipse>
    <ellipse fill="#FFCC4D" cx="18.5" cy="21" rx="1.5" ry="1"></ellipse>
    <path fill="#5C913B" d="M19.117 21.274a.503.503 0 0 1-.44-.739c.16-.294.328-.561.502-.795a10 10 0 0 1-.43.009c-.276 0-.528-.225-.528-.501s.195-.5.472-.5l.082.001c.296 0 .6-.018.872-.043a.49.49 0 0 1 .41.156c.014-.011.028-.022.043-.031c.1-.066.193-.119.28-.161a.49.49 0 0 1 .211-.094l.036-.007c.188-.061.32-.069.373-.069a.498.498 0 0 1 .477.647c-.082.266-.265.326-.586.39a1.2 1.2 0 0 0-.238.128a.507.507 0 0 1-.599-.034a.499.499 0 0 1-.002.614c-.17.217-.337.475-.496.768a.498.498 0 0 1-.439.261zm-1.42-1.589a.497.497 0 0 1-.066-.004a6.98 6.98 0 0 1-1.056-.221a.5.5 0 0 1-.337-.622l.006-.02l-.012.023a.5.5 0 0 1-.681.192a4.126 4.126 0 0 1-.907-.681a.5.5 0 0 1 .707-.707c.197.197.428.37.688.515a.5.5 0 0 1 .229.597a.5.5 0 0 1 .59-.256c.276.082.579.145.9.188a.5.5 0 0 1-.061.996zm-2.452-2.339c-.426 0-.977-.165-1.311-.559c-.512-.604-.813-1.379-.767-1.973c.012-.159-.143-.287-.295-.327c-.087-.023-.24-.037-.312.118a.25.25 0 0 1-.454-.21c.156-.339.506-.49.892-.392c.358.093.701.415.667.85c-.036.462.226 1.109.65 1.61c.223.264.611.371.875.381c.215.011.324-.038.347-.059c-.056-.133-.797-.523-1.113-.689c-.269-.141-.349-.335-.369-.472c-.067-.455.4-.916.852-1.36c.159-.157.31-.305.392-.414c.093-.123.078-.205.06-.256c-.069-.187-.368-.372-.728-.452c-.333-.074-.558-.235-.668-.479c-.145-.321-.068-.741.234-1.285a.25.25 0 1 1 .437.243c-.285.512-.257.744-.215.837c.042.092.149.157.32.195c.423.094.932.345 1.088.767c.089.241.044.501-.128.73c-.104.139-.268.3-.441.471c-.258.254-.739.727-.708.931c.006.042.061.079.107.102c.751.394 1.25.679 1.352 1.028a.456.456 0 0 1-.042.359c-.097.169-.299.273-.585.299c-.043.004-.09.006-.137.006z"></path>
    <ellipse fill="#FFCC4D" cx="19.5" cy="18" rx=".5" ry="1"></ellipse>
    <path fill="#FFCC4D" d="M17.292 17.188c0 .288-.345.521-.771.521c-.425 0-.771-.233-.771-.521s.345-.521.771-.521c.425 0 .771.233.771.521zm-1.187-4.627c.05.212-.227.46-.619.553c-.392.093-.75-.004-.801-.216c-.05-.213.227-.461.618-.554c.393-.092.752.004.802.217z"></path>
    <path fill="#C1694F" d="M22.533 17.955c.09.07.243-.729.22-.978c0-.017-.029-.546.083-.924c.069-.128.073-1.083-.033-1.334c.084-.007.185-.034.197-.136c-.388.143-.479-.817-.852-1.369c-.362-.553-.811-.875-1.28-1.211a.979.979 0 0 1 .162-.27c-.575.288-1.471-.755-2.795-.677c-.297.029-.438.047-.514.229c-.247.02-.498.076-.498.401c0 .078.071.22.229.221c.216.063.392.014.539.316l.039.312s-.193-.247-.299-.286l.065-.133c-.1-.058-.277-.011-.277-.011s-.385-.18-.694-.132l-.06-.25c-.054.154-.175.146-.192.291c-.034-.104-.079-.233-.111-.337c-.109.148-.077.308-.116.462c-.042.036-.128.037-.15-.062c-.011-.122-.026-.133-.026-.278c-.078.137-.172.204-.203.439l-.083-.26c.003.307-.261.49-.511.707c-.071.13.011.131.017.198l.132.066l.237-.017c.039.049.007.053.11.084c.276.077.62-.254.89.267c-.124.104-.249.347-.209.393c.05 0-.1.07.102.006c-.21.204-.352.473-.352.489c-.024.058.084-.008.062.097l.05-.006c-.479.518-.016 1.075-.067 1.374c.08.129.09-.003.19-.016c.084.368.326.591.474.882l-.312.003c.007.138.132.269.231.39l-.209.066a1.128 1.128 0 0 0-.352.274c-.069.168.333.208.527.238l-.007.203c.303.029.653-.061.653-.078l.076-.059l.171.094c.057 0 .146-.228.105-.403c.11.131.214.342.324.474l.103-.014c.094.149.223.297.317.446l.105.04c.061-.021.113-.028.146-.148l.048.084l.166-.114l.116-.023l.087.142c.051-.019.101-.13.104-.248c.052.103.066.095.104.122l.077-.162l.415.388l.314.018c.112.076.419.124.471.001c.252.108.549-.014.534-.134c.232.092.589.03.589.015c.043-.005.153-.113.049-.194c-.767-.534-1.904-1.418-2.343-1.631c0-.158-.119-.727-.247-.883l.104-.174c.299.279.407.252.566.296c.17.135.229.34.399.527l.152.028a2.583 2.583 0 0 0-.554-.873c.164.082.436.301.618.46c.12.201.155.361.265.613c.08.051.162.238.151.083c-.019-.291-.224-.752-.224-.785c.326.258.322.66.421.905c.083.124.125.29.161.251l-.096-.756l-.056-.277c.241.139.327.669.44 1.305c0 .101.041.212.035.277c.052.064.111.241.11.136c0 0 0-1.034-.071-1.271c-.018-.127.03-.333.03-.333c.088.429.182.894.271 1.322v.315l.132.133c.025-.26.055-.518.081-.776l-.099-.925v-.264c-.002-.093.085-.076.14.03c.013.227.013.404.022.63c.039.258.066.447.085.776c.011.266.023.904.079.893z"></path>
  </g>
</svg>
`;

const COLOMBIA_FLAG_SVG = `
<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill="#FBD116" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"></path>
    <path fill="#22408C" d="M0 18h36v7H0z"></path>
    <path fill="#CE2028" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-2H0v2z"></path>
  </g>
</svg>
`;

const DEFAULT_FLAG_SVG = `
<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="18" cy="18" r="16" fill="#334155"></circle>
  <path d="M6 18h24M18 6a18 18 0 0 0 0 24M18 6a18 18 0 0 1 0 24" stroke="#cbd5e1" stroke-width="2" fill="none"></path>
</svg>
`;

const COUNTRY_INFO: Record<string, { flagSvg: string; label: string }> = {
  CO: { flagSvg: COLOMBIA_FLAG_SVG, label: 'Colombia' },
  MX: { flagSvg: MEXICO_FLAG_SVG, label: 'Mexico' },
};

const Contact: React.FC = () => {
  const { data, t, language } = useLanguage();
  const contact = data.contact;
  const whatsappMessage =
    language === 'es'
      ? 'Hola, quiero ponerme en contacto contigo.'
      : "Hi, I'd like to get in touch with you.";

  const socialLinks: SocialLink[] = [
    {
      name: 'Gmail',
      href: `mailto:${contact.email}`,
      hint: language === 'es' ? 'Correo directo' : 'Direct email',
      variant: 'gmail',
      iconSvg: GMAIL_ICON_SVG,
    },
    {
      name: 'LinkedIn',
      href: contact.social.linkedin,
      hint: language === 'es' ? 'Perfil profesional' : 'Professional profile',
      variant: 'linkedin',
      iconSvg: LINKEDIN_ICON_SVG,
    },
    {
      name: 'GitHub',
      href: contact.social.github,
      hint: language === 'es' ? 'Repositorios' : 'Repositories',
      variant: 'github',
      iconSvg: GITHUB_ICON_SVG,
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container contact-shell">
        <div className="contact-head">
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-badge"
          >
            {t('status')}: {t('statusValue')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            {t('contact')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-description"
          >
            {t('contactSubtitle')}
          </motion.p>
        </div>

        <div className="contact-grid">
          <motion.article
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass contact-location-card"
          >
            <div className="contact-globe-layer">
              <Globe scale={0.9} />
            </div>
            <div className="contact-location-scrim" />

            <div className="contact-location-content">
              <span className="contact-location-chip">
                <MapPin size={14} />
                {language === 'es' ? 'Base de operaciones' : 'Primary location'}
              </span>
              <h3 className="contact-location-title">{contact.address}</h3>
            </div>
          </motion.article>

          {contact.phones.slice(0, 2).map((phone, index) => {
            const phoneForTel = phone.number.replace(/\s+/g, '');
            const phoneForWhatsapp = phone.number.replace(/\D/g, '');
            const whatsappLink = `https://wa.me/${phoneForWhatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
            const country = COUNTRY_INFO[phone.countryCode] ?? { flagSvg: DEFAULT_FLAG_SVG, label: phone.countryCode };
            const whatsappLabel = language === 'es' ? 'Enviar WhatsApp' : 'Message on WhatsApp';
            const phoneLabel = phone.label.replace(/\s*\([^)]*\)\s*$/, '').trim();

            return (
              <motion.article
                key={phone.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className={`glass contact-phone-card ${index === 0 ? 'contact-phone-card--co' : 'contact-phone-card--mx'}`}
              >
                <div className="contact-phone-head">
                  <div className="contact-icon-wrap">
                    <Phone size={20} />
                  </div>
                  <div className="contact-phone-meta">
                    <span className="contact-phone-label">{phoneLabel}</span>
                    <span
                      className="contact-country-flag"
                      title={country.label}
                      aria-label={country.label}
                      dangerouslySetInnerHTML={{ __html: country.flagSvg }}
                    />
                  </div>
                </div>

                <a href={`tel:${phoneForTel}`} className="contact-phone-number">
                  {phone.number}
                </a>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="contact-whatsapp-link">
                  <span className="contact-whatsapp-icon" dangerouslySetInnerHTML={{ __html: WHATSAPP_ICON_SVG }} />
                  <span>{whatsappLabel}</span>
                </a>
              </motion.article>
            );
          })}

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass contact-social-card"
          >
            <div className="contact-social-links">
              {socialLinks.map((item, index) => {
                const isExternal = item.href.startsWith('http');

                return (
                  <React.Fragment key={item.name}>
                    <a
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                      className={`contact-social-link contact-social-link--${item.variant}`}
                    >
                      <div className="contact-social-icon" dangerouslySetInnerHTML={{ __html: item.iconSvg }} />
                      <div className="contact-social-text">
                        <p className="contact-social-title">{item.name}</p>
                        <p className="contact-social-caption">
                          {item.hint}
                          <ExternalLink size={12} />
                        </p>
                      </div>
                    </a>

                    {index < socialLinks.length - 1 ? <div className="contact-social-divider" /> : null}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Contact;
