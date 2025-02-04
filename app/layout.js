import {ClerkProvider}  from "@clerk/nextjs";
import "./globals.css";
import Provider from "./provider";
import Footer from "./Dashboard/_components/Footer";


export default function RootLayout({ children }) {
  return (
     <ClerkProvider>
      <html lang="en">
     
      <body>
       
      <Provider>
        <div className="min-h-screen  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          {children}
        </div>
       
         </Provider>
         <Footer/>
     </body>
       </html> 
      </ClerkProvider>
     
     );
}
     
 
