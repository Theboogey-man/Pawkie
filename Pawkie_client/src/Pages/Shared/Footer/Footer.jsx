import React from 'react';

const Footer = () => {
    return (
        <footer className=" text-[#F7B385] px-6 py-10 lg:px-20">
            <div className="max-w-full mx-auto flex flex-col lg:flex-row justify-between items-start gap-20">
                
                {/* Left: Logo & Info */}
                <aside className="flex-1">
                    <img className="h-30 mb-2" src="src/assets/footer.png" alt="Pawkie Logo" />
                    <p className="text-sm ml-10">
                        Providing reliable service since 2023
                    </p>
                </aside>

                {/* Right: Navigation */}
                <div className="flex flex-wrap gap-10 justify-end w-full lg:w-auto">
                    <nav>
                    <h6 className="footer-title text-lg text-[#FFFFFF] mb-2">Services</h6>
                        <a className="link link-hover hover:underline block">Branding</a>
                        <a className="link link-hover hover:underline block">Design</a>
                        <a className="link link-hover hover:underline block">Marketing</a>
                        <a className="link link-hover hover:underline block">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title text-lg text-white mb-2">Company</h6>
                        <a className="link link-hover hover:underline block">About us</a>
                        <a className="link link-hover hover:underline block">Contact</a>
                        <a className="link link-hover hover:underline block">Jobs</a>
                        <a className="link link-hover hover:underline block">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title text-lg text-white mb-2">Legal</h6>
                        <a className="link link-hover hover:underline block">Terms of use</a>
                        <a className="link link-hover hover:underline block">Privacy policy</a>
                        <a className="link link-hover hover:underline block">Cookie policy</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
