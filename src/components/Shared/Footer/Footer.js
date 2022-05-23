import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from '../../../assets/logo.png';

const Footer = () => {
    const socialMedia = 'btn btn-primary bg-primary flex h-auto min-h-fit items-center p-2 rounded-full text-secondary';
    const footerTitle = 'footer-title my-2 opacity-100 text-lg text-primary';
    const spanStyle = 'font-semibold link link-hover';

    return (
        <footer className='bg-neutral px-20 py-10'>
            <div className="footer grid grid-cols-7 text-neutral-content">
                <div className='col-span-2'>
                    <div><img className='w-1/6' src={logo} alt="logo" /></div>
                    <h3 className='font-bold text-xl text-primary'>Manufacture Online Ltd.</h3>
                    <p className='font-semibold'>Providing reliable services since 2004.</p>
                </div>

                <div>
                    <h4 class={footerTitle}>Services</h4>
                    <span class={spanStyle}>Purchase</span>
                    <span class={spanStyle}>Delivery</span>
                    <span class={spanStyle}>Offers</span>
                    <span class={spanStyle}>Blogs</span>
                </div>

                <div>
                    <h4 class={footerTitle}>Company</h4>
                    <span class={spanStyle}>About us</span>
                    <span class={spanStyle}>Contact us</span>
                    <span class={spanStyle}>Why us</span>
                </div>

                <div>
                    <h4 class={footerTitle}>Legal</h4>
                    <span class={spanStyle}>Terms of use</span>
                    <span class={spanStyle}>Privacy policy</span>
                    <span class={spanStyle}>Cookie policy</span>
                    <span class={spanStyle}>Legal policy</span>
                </div>

                <div className='col-span-2'>
                    <h4 className={footerTitle}>Social</h4>

                    <div className="grid grid-flow-col gap-4">
                        <button className={socialMedia}><FontAwesomeIcon className='text-xl' icon={faFacebook}></FontAwesomeIcon></button>
                        <button className={socialMedia}><FontAwesomeIcon className='text-xl' icon={faTwitter}></FontAwesomeIcon></button>
                        <button className={socialMedia}><FontAwesomeIcon className='text-xl' icon={faInstagram}></FontAwesomeIcon></button>
                        <button className={socialMedia}><FontAwesomeIcon className='text-xl' icon={faLinkedin}></FontAwesomeIcon></button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;