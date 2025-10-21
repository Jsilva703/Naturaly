
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// --- SVG Icons as Components ---
const Icon = ({ name, ...props }) => {
    const icons = {
        package: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></>,
        creditCard: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></>,
        send: <><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></>,
        truck: <><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></>,
        archive: <><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></>,
        clock: <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>,
        sun: <><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></>,
        shieldOff: <><path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line></>,
        snowflake: <><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></>,
        mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>,
        whatsapp: <><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM17.46 15.57C17.31 15.96 16.48 16.39 16.1 16.45C15.72 16.5 15.21 16.53 14.83 16.39C14.44 16.25 13.57 15.92 12.56 15.02C11.31 13.89 10.53 12.54 10.39 12.3C10.24 12.06 10.12 11.88 9.91 11.61C9.71 11.33 9.53 11.1 9.34 10.84C9.16 10.58 9.06 10.37 8.97 10.16C8.87 9.95 8.73 9.61 8.87 9.26C9 8.91 9.16 8.65 9.36 8.45C9.56 8.25 9.78 8.16 10.04 8.16C10.29 8.16 10.5 8.16 10.65 8.18C10.8 8.2 10.95 8.2 11.12 8.5C11.3 8.8 11.64 9.59 11.7 9.71C11.76 9.83 11.81 9.99 11.7 10.16C11.59 10.33 11.5 10.43 11.38 10.57C11.27 10.71 11.16 10.81 11.05 10.93C10.94 11.05 10.81 11.19 10.97 11.48C11.13 11.77 11.59 12.47 12.21 13.04C12.99 13.78 13.63 14.07 13.88 14.22C14.13 14.36 14.28 14.33 14.43 14.18C14.58 14.03 14.95 13.59 15.17 13.32C15.39 13.05 15.65 12.99 15.9 13.08C16.15 13.18 16.89 13.51 17.08 13.6C17.27 13.7 17.41 13.75 17.46 13.83C17.51 13.91 17.51 14.25 17.46 15.57Z"></path></>,
        instagram: <><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path></>,
        externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></>,
    };

    const SvgWrapper = (props) => {
        const size = props.width || 24;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                {icons[name]}
            </svg>
        );
    };

    const SvgFillWrapper = (props) => {
        const size = props.width || 28;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
                {icons[name]}
            </svg>
        );
    };
    
    return name === 'whatsapp' || name === 'instagram' ? <SvgFillWrapper {...props} /> : <SvgWrapper {...props} />;
};


// --- Hooks ---
const useScrollFadeIn = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);
};

// --- Components ---
const Section = ({ id, children, className = '' }) => (
    <section id={id} className={`section ${className}`}>
        <div className="container fade-in-section">
            {children}
        </div>
    </section>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('no-scroll', !isMenuOpen);
    };

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.body.classList.remove('no-scroll');
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navLinks = [
        { href: '#how-it-works', label: 'Como Funciona' },
        { href: '#delivery-area', label: 'Entregas' },
        { href: '#order', label: 'Planos' },
        { href: '#gallery', label: 'Galeria' },
    ];
    
    return (
        <header className="header">
            <div className="nav-container container">
                <a href="#" className="logo">Natur<span>ALY</span></a>
                <nav className="desktop-nav">
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.href}><a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>{link.label}</a></li>
                        ))}
                    </ul>
                </nav>
                <button className={`hamburger-menu ${isMenuOpen ? 'is-open' : ''}`} aria-label="Abrir menu" onClick={toggleMenu}>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
            <nav className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`}>
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}>{link.label}</a>
                ))}
            </nav>
        </header>
    );
};

const Hero = () => (
    <section className="hero">
        <div className="container hero-content">
            <div className="hero-text fade-in-section">
                <h1>O Puro Suco da Laranja, na sua casa.</h1>
                <p>Natural, sem conservantes e sem adição de açúcar. A energia da fruta para começar bem o seu dia.</p>
                <a href="#order" className="btn">
                    <span>ESCOLHA SEU PLANO</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
                </a>
            </div>
            <div className="hero-image-composition fade-in-section">
                 <div className="hero-image-card card-back">
                    <img src="https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/b06a3e0169315e261411c40ba99741dd_1624/production/Suco_01_1761063005200.675Z" alt="Copo com suco de laranja" />
                    <p>Copo com suco de laranja</p>
                </div>
                <div className="hero-image-card card-front">
                    <img src="https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/cb51c9c0e6fd3b13454c432df1dab34f_1624/production/ImagemdoWhatsAppde2025-10-02s10_1759420852763.37" alt="Garrafa de suco de laranja" />
                    <p>Garrafa de suco de laranja</p>
                </div>
            </div>
        </div>
    </section>
);

const HowItWorks = () => {
    const steps = [
        { icon: 'package', title: 'ESCOLHA SEU PLANO', description: 'A quantidade ideal de suco para sua rotina mensal.' },
        { icon: 'creditCard', title: 'FAÇA O PAGAMENTO', description: 'Pague de forma segura com o Mercado Pago.' },
        { icon: 'send', title: 'ENVIE O COMPROVANTE', description: 'Nos envie o comprovante para agendarmos sua entrega.' },
        { icon: 'truck', title: 'RECEBA EM CASA', description: 'Seu suco chega fresquinho, na data combinada.' },
    ];
    return (
        <Section id="how-it-works">
            <h2 className="section-title">COMO FUNCIONA</h2>
            <p className="section-subtitle">Receber seu suco Naturaly é simples e rápido. Em poucos passos você garante saúde e praticidade para sua rotina.</p>
            <div className="how-it-works-grid">
                {steps.map(step => (
                    <div className="step" key={step.title}>
                        <div className="icon"><Icon name={step.icon} width="32" height="32" /></div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Preparation = () => (
    <Section id="preparation" className="bg-white">
        <h2 className="section-title">CUIDADO QUE PRESERVA O SABOR</h2>
        <p className="section-subtitle">Para garantir a melhor experiência, seu suco Naturaly chega congelado. Siga os passos simples para aproveitar todo o frescor.</p>
        <div className="preparation-grid">
            <div className="prep-card">
                <div className="icon"><Icon name="archive" width="48" height="48" /></div>
                <h3>Como descongelar?</h3>
                <p>Transfira a garrafa do congelador para a <strong>geladeira</strong> e aguarde cerca de 24 horas. Após esse tempo, seu suco estará perfeito para consumo.</p>
            </div>
            <div className="prep-card">
                <div className="icon"><Icon name="clock" width="48" height="48" /></div>
                <h3>Qual a validade?</h3>
                <p>O produto congelado é válido por <strong>90 dias</strong>. Após descongelado, deve ser mantido na geladeira e consumido em até <strong>5 dias</strong>.</p>
            </div>
        </div>
    </Section>
);

const Differentials = () => {
    const items = [
        { icon: 'sun', title: 'Laranjas Frescas', description: 'Feito com laranjas frescas e selecionadas, para garantir o máximo de sabor e nutrientes.' },
        { icon: 'shieldOff', title: '100% Natural', description: 'Sem adição de açúcares, conservantes, corantes ou qualquer aditivo químico.' },
        { icon: 'snowflake', title: 'Congelamento Rápido', description: 'O sabor e os nutrientes da fruta são preservados pelo processo de congelamento.' },
    ];
    return (
        <Section id="differentials">
            <h2 className="section-title">NOSSOS DIFERENCIAIS</h2>
            <p className="section-subtitle">Qualidade é a nossa prioridade. Veja o que torna nosso suco especial.</p>
            <div className="differentials-grid">
                {items.map(item => (
                    <div className="differential" key={item.title}>
                        <div className="icon"><Icon name={item.icon} width="60" height="60" strokeWidth="1.5" /></div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const DeliveryArea = () => {
    const cities = ['Uberaba', 'Uberlândia', 'Nova Ponte', 'Patos de Minas'];
    return (
        <Section id="delivery-area">
            <h2 className="section-title">ÁREA DE ENTREGA</h2>
            <p className="section-subtitle">Verifique se atendemos a sua cidade. Estamos expandindo constantemente!</p>
            <div className="city-list">
                {cities.map(city => (
                    <div className="city-item" key={city}>
                        <Icon name="mapPin" />
                        <span>{city}</span>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Gallery = () => {
    const allSlides = [
        { type: 'video', src: 'https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/c3aeccc6cd9635d35bd9d18e6ff3fba6_1624/production/VdeodoWhatsAppde2025-10-02s10_1759420949239.37', poster: 'https://images.unsplash.com/photo-1525385135031-638706d9b0a3?q=80&w=800&auto=format&fit=crop' },
        { type: 'image', src: 'https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/b06a3e0169315e261411c40ba99741dd_1624/production/Suco_01_1761063005200.675Z', alt: 'Suco Naturaly' },
        { type: 'image', src: 'https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/cb51c9c0e6fd3b13454c432df1dab34f_1624/production/ImagemdoWhatsAppde2025-10-02s10_1759420852763.37', alt: 'Garrafas de suco' },
        { type: 'image', src: 'https://mkdocs-201908.s3.sa-east-1.amazonaws.com/1624/production/7ae7b1a02ac5e8724f7b0fa3d0353dc3_1624/production/ImagemdoWhatsAppde2025-10-02s10_1759420878393.37', alt: 'Preparação do suco' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % allSlides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + allSlides.length) % allSlides.length);
    
    useEffect(() => {
        const timer = setTimeout(nextSlide, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <Section id="gallery">
            <h2 className="section-title">NOSSA PRODUÇÃO</h2>
            <p className="section-subtitle">Um pouco do nosso cuidado, da colheita ao seu copo.</p>
            <div className="gallery-container">
                <div className="carousel">
                    <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {allSlides.map((slide, index) => (
                            <div className="carousel-slide" key={index}>
                                {slide.type === 'video' ? (
                                    <video controls poster={slide.poster}><source src={slide.src} type="video/mp4" /></video>
                                ) : (
                                    <img src={slide.src} alt={slide.alt} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="carousel-controls">
                        <button className="carousel-btn prev" aria-label="Anterior" onClick={prevSlide}>&#10094;</button>
                        <button className="carousel-btn next" aria-label="Próximo" onClick={nextSlide}>&#10095;</button>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const Footer = () => (
    <footer className="footer">
        <div className="container footer-content">
            <div className="footer-about">
                <div className="footer-logo">Natur<span>ALY</span></div>
                <p>Sabor que vem da natureza, entregue com praticidade na sua casa. 100% fruta, 100% saúde.</p>
                <div className="social-icons">
                    <a href="https://wa.me/553497742420" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
                    <a href="https://www.instagram.com/alyxandrecxta/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
                </div>
            </div>
            <div className="footer-column">
                <h4>Navegação</h4>
                <ul className="footer-links">
                    <li><a href="#how-it-works">Como Funciona</a></li>
                    <li><a href="#delivery-area">Entregas</a></li>
                    <li><a href="#order">Planos</a></li>
                    <li><a href="#gallery">Galeria</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Legal</h4>
                <ul className="footer-links">
                    <li><a href="#">Dúvidas Frequentes</a></li>
                    <li><a href="#">Política de Privacidade</a></li>
                </ul>
            </div>
        </div>
        <div className="container">
            <p className="copyright">&copy; {new Date().getFullYear()} Sucos Naturaly. Todos os direitos reservados.</p>
        </div>
    </footer>
);


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay is-visible" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" aria-label="Fechar modal" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};


const ProgressBar = ({ currentStep }) => {
    const steps = ['Plano', 'Entrega', 'Confirmar'];
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isComplete = stepNumber < currentStep;
                    return (
                        <React.Fragment key={step}>
                            <div className={`progress-step ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}>
                                <div className="progress-circle">{isComplete ? '✔' : stepNumber}</div>
                                <div className="progress-label">{step}</div>
                            </div>
                            {index < steps.length - 1 && <div className={`progress-connector ${isComplete ? 'is-complete' : ''}`}></div>}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const Order = () => {
    const plans = [
        { name: '1 Garrafa Avulsa', price: 'R$ 7', priceSuffix: ',00', description: 'Perfeito para provar nosso sabor 100% natural.', info: 'Pagamento único', link: 'https://nubank.com.br/cobrar/13yooq/68e024fc-9757-4167-8a4b-3dd2a59f2dae', provider: 'Pix ou Cartão', isPopular: false },
        { name: 'Plano Individual', price: 'R$ 56', priceSuffix: ',00/mês', description: '8 garrafas/mês. Ideal para um consumo individual.', info: 'Assinatura mensal com fidelidade de 3 meses.', link: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=e287ee9c79c04cb3b5942b92cc2377f7', provider: 'Mercado Pago', isPopular: false },
        { name: 'Plano Duo', price: 'R$ 80', priceSuffix: ',00/mês', description: '12 garrafas/mês. Para dividir ou para quem ama muito suco.', info: 'Assinatura mensal com fidelidade de 3 meses.', link: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=f52e0572a4c14a49a5d4e547f58a05f4', provider: 'Mercado Pago', isPopular: false },
        { name: 'Plano Família', price: 'R$ 96', priceSuffix: ',00/mês', description: '16 garrafas/mês. O melhor custo-benefício.', info: 'Assinatura mensal com fidelidade de 3 meses.', link: 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=ed337f8cf4294f7b80a94aa8a84f52c5&fbclid=PAZnRzaAM5dkFleHRuA2FlbQIxMQABp1Qlyl-jQj7Xl2A2WLshtt_o1h79lN7OAs8t8gzq0ea0aPg4bjHgOgeImHaO_aem_E4Sf-eFoR3xqhXPU2pP8Tw', provider: 'Mercado Pago', isPopular: true },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({ city: '', day: '', address: '' });
    const [errors, setErrors] = useState<{ city?: string; day?: string; address?: string; }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setErrors(prev => ({...prev, [id]: undefined}));
        setFormData(prev => ({...prev, [id]: value }));
    };

    const isDeliveryFormValid = () => {
        const { city, day, address } = formData;
        const dayNum = parseInt(day, 10);
        return !!city && day.length > 0 && !isNaN(dayNum) && dayNum >= 1 && dayNum <= 31 && address.trim().length > 5;
    };

    const handleNextStep = () => setCurrentStep(prev => prev + 1);
    const handlePrevStep = () => setCurrentStep(prev => prev - 1);
    
    const validateAndProceed = () => {
        const newErrors: { city?: string; day?: string; address?: string; } = {};
        if (!formData.city) newErrors.city = "Por favor, selecione uma cidade.";
        const dayNum = parseInt(formData.day, 10);
        if (!formData.day || isNaN(dayNum) || dayNum < 1 || dayNum > 31) newErrors.day = "Por favor, insira um dia válido (1-31).";
        if (formData.address.trim().length <= 5) newErrors.address = "Seu endereço completo é necessário.";
        
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handleNextStep();
        }
    };

    const openPaymentModal = () => {
        if (selectedPlan?.link) {
            window.open(selectedPlan.link, '_blank', 'noopener,noreferrer');
        }
        setIsModalOpen(true);
    };

    const whatsappMessage = encodeURIComponent(`Olá! Gostaria de confirmar o pagamento do plano ${selectedPlan?.name}, com entrega para o dia ${formData.day} em ${formData.city}, no endereço: ${formData.address}. Segue o comprovante.`);
    const whatsappLink = `https://wa.me/553497742420?text=${whatsappMessage}`;

    return (
        <Section id="order">
            <h2 className="section-title">PEÇA O SEU NATURALY</h2>
            <p className="section-subtitle">Siga os passos e receba o puro suco da laranja na sua casa.</p>
            <div className="order-form-container">
                <ProgressBar currentStep={currentStep} />

                {currentStep === 1 && (
                    <div className="form-step-content">
                        <h3>1. Escolha seu Plano</h3>
                        <div className="plan-selection-grid">
                            {plans.map(plan => (
                                <div key={plan.name} className={`plan-card ${selectedPlan?.name === plan.name ? 'selected' : ''} ${plan.isPopular ? 'has-badge' : ''}`} onClick={() => setSelectedPlan(plan)}>
                                    {plan.isPopular && <span className="badge">POPULAR</span>}
                                    <div className="plan-details">
                                        <div>
                                            <h4>{plan.name}</h4>
                                            <div className="price">{plan.price}<small>{plan.priceSuffix}</small></div>
                                            <p className="description">{plan.description}</p>
                                        </div>
                                        <p className="plan-info">{plan.info}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="step-navigation">
                             <button className="btn" disabled={!selectedPlan} onClick={handleNextStep}>
                                PRÓXIMO
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
                            </button>
                        </div>
                    </div>
                )}
                
                {currentStep === 2 && (
                    <div className="form-step-content">
                        <h3>2. Agende sua Entrega</h3>
                        <div className="delivery-options">
                            <div className="form-group">
                                <label htmlFor="city">Cidade</label>
                                <select id="city" value={formData.city} onChange={handleInputChange} className={errors.city ? 'is-invalid' : ''} required>
                                    <option value="" disabled>Selecione sua cidade</option>
                                    <option value="Uberaba">Uberaba</option>
                                    <option value="Uberlândia">Uberlândia</option>
                                    <option value="Nova Ponte">Nova Ponte</option>
                                    <option value="Patos de Minas">Patos de Minas</option>
                                </select>
                                {errors.city && <p className="error-message">{errors.city}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="day">Dia do Mês para Entrega</label>
                                <input type="number" id="day" value={formData.day} onChange={handleInputChange} placeholder="Escolha um dia (1 a 31)" min="1" max="31" className={errors.day ? 'is-invalid' : ''} required />
                                {errors.day && <p className="error-message">{errors.day}</p>}
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="address">Endereço Completo (Rua, Nº, Bairro)</label>
                                <input type="text" id="address" value={formData.address} onChange={handleInputChange} placeholder="Ex: Rua das Flores, 123, Centro" className={errors.address ? 'is-invalid' : ''} required />
                                {errors.address && <p className="error-message">{errors.address}</p>}
                            </div>
                        </div>
                         <div className="step-navigation">
                            <button className="btn btn-secondary" onClick={handlePrevStep}>VOLTAR</button>
                            <button className="btn" disabled={!isDeliveryFormValid()} onClick={validateAndProceed}>
                                REVISAR PEDIDO
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                     <div className="form-step-content">
                        <h3>3. Confirme seu Pedido</h3>
                        <div className="order-summary">
                            <div className="order-summary-item order-plan-details">
                                <div>
                                    <span className="order-summary-label">Plano</span>
                                    <strong className="order-summary-value">{selectedPlan?.name}</strong>
                                </div>
                                <div>
                                    <span className="order-summary-label">Preço</span>
                                    <span className="order-summary-value order-plan-price">{selectedPlan?.price}<small>{selectedPlan?.priceSuffix}</small></span>
                                </div>
                            </div>
                            <div className="order-summary-item">
                                <span className="order-summary-label">Entrega</span>
                                <strong className="order-summary-value">Dia {formData.day} em {formData.city}</strong>
                            </div>
                             <div className="order-summary-item">
                                <span className="order-summary-label">Endereço</span>
                                <strong className="order-summary-value">{formData.address}</strong>
                            </div>
                        </div>
                         <div className="step-navigation">
                            <button className="btn btn-secondary" onClick={handlePrevStep}>VOLTAR</button>
                            <button className="btn" onClick={openPaymentModal}>
                                Pagar com {selectedPlan?.provider}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <>
                    <div className="modal-icon">
                        <Icon name="externalLink" width="32" height="32" />
                    </div>
                    <h2>Pagamento Iniciado!</h2>
                    <p className="modal-instructions">A página de pagamento foi aberta em uma nova aba. Assim que finalizar, <strong>envie seu comprovante pelo WhatsApp</strong> para agendarmos sua entrega.</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn modal-btn whatsapp">
                        <Icon name="whatsapp" width="20" height="20" />
                        ENVIAR COMPROVANTE
                    </a>
                </>
            </Modal>
        </Section>
    );
};


const App = () => {
    useScrollFadeIn();
    return (
        <>
            <Header />
            <main>
                <Hero />
                <HowItWorks />
                <Preparation />
                <Differentials />
                <DeliveryArea />
                <Order />
                <Gallery />
            </main>
            <Footer />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);