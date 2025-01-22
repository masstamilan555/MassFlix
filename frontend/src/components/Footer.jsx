
const Footer = () => {
    return (
            <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800 ">
                <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a href="https://portfolio-masstamilan.netlify.app" target="_blank" className="font-medium underline underline-offset-4">
                        
                        <span className="text-red-800">Masstamilan</span> 
                        </a>
                        {". "}
                        Check out my  Profile {" "}
                        <a href="https://www.linkedin.com/in/tamilarasu55/" rel="noreferrer" target="_blank" className="font-medium underline underline-offset-4">
                            <span className="text-blue-500">LinkedIn</span>
                        </a>
                    </p>
                </div>
            </footer>
    )
}

export default Footer
