import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import logo from '../../../assets/logo.png';

const Footer = () => {
    const socialMedia = 'btn btn-primary flex h-auto min-h-fit items-center p-2 rounded-full text-accent hover:text-secondary';
    const footerTitle = 'footer-title my-2 opacity-100 text-lg text-primary';
    const spanStyle = 'font-semibold link link-hover';

    return (
        <footer className='bg-base-300 px-20 py-10'>
            <div className="footer grid grid-cols-7">
                <div className='col-span-2'>
                    <div><img className='w-1/6' src={logo} alt="logo" /></div>
                    <h3 className='font-bold text-xl text-primary'>Manufacture Online Ltd.</h3>
                    <p className='font-semibold'>Providing reliable services since 2004.</p>
                </div>

                <div>
                    <h4 className={footerTitle}>Services</h4>
                    <span className={spanStyle}>Purchase</span>
                    <span className={spanStyle}>Delivery</span>
                    <span className={spanStyle}>Offers</span>
                    <span className={spanStyle}>Blogs</span>
                </div>

                <div>
                    <h4 className={footerTitle}>Company</h4>
                    <span className={spanStyle}>About us</span>
                    <span className={spanStyle}>Contact us</span>
                    <span className={spanStyle}>Why us</span>
                </div>

                <div>
                    <h4 className={footerTitle}>Legal</h4>
                    <span className={spanStyle}>Terms of use</span>
                    <span className={spanStyle}>Privacy policy</span>
                    <span className={spanStyle}>Cookie policy</span>
                    <span className={spanStyle}>Legal policy</span>
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