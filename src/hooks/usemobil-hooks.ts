import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(window.innerWidth < MOBILE_BREAKPOINT)

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Ekran boyutunun değişmesini dinleyin
    window.addEventListener("resize", onResize)
    
    // İlk render sırasında doğru değeri ayarla
    onResize()

    // Temizleme işlevi
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return isMobile
}
