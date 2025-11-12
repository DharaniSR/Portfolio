import { Box, Button, Center, Flex, Heading, HStack, Link, Tooltip, Image, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css'
import GitHubCalendar from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useEffect } from 'react';
import { LuCloudDownload } from 'react-icons/lu'
import { FaPhoneAlt } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'

import { projects, skills } from '../Utils/data';

import ProjectCard from '../Components/Card';
import Svg1 from '../Components/Svg1';
import Svg2 from '../Components/Svg2';
import Svg3 from '../Components/Svg3';
import Resume from '../Resume/Dharani_Resume.pdf'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 2200 },
        items: 5
    },
    largeDesktop: {
        breakpoint: { max: 2200, min: 1920 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1920, min: 1075 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1075, min: 780 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 780, min: 0 },
        items: 1
    }
};

const Home = () => {

    const form = useRef();
    const toast = useToast()

    useEffect(() => {
        // * it's from Aos library to to use scroll designing
        Aos.init()
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        // Check EmailJS environment variables
        const serviceId = import.meta.env.VITE_SERVICE_ID
        const templateId = import.meta.env.VITE_SERVICE_TEMPLATE
        const publicKey = import.meta.env.VITE_SERVICE_SECRET

        if (!serviceId || !templateId || !publicKey) {
            // Fallback: open the user's default mail client with a prefilled email to your address
            // Use real CRLF/newlines and encode once (avoid double-encoding % sequences)
            console.warn('EmailJS not configured. Falling back to mailto.')

            const name = form.current?.from_name?.value || ''
            const fromMail = form.current?.from_mail?.value || ''
            const messageText = form.current?.message?.value || ''

            const subject = `Portfolio message from ${name || 'Visitor'}`

            // Build body using actual newlines, then encode once below.
            let body = `Name: ${name}\r\nEmail: ${fromMail}\r\n\r\nMessage:\r\n${messageText}`

            // Sanitize/truncate to avoid extremely long mailto URLs that some clients choke on
            const MAX_BODY_LENGTH = 3000
            if (body.length > MAX_BODY_LENGTH) {
                body = body.slice(0, MAX_BODY_LENGTH) + '\r\n\r\n...message truncated...'
            }

            const mailto = `mailto:dharanisr2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

            // Use location.href — often more reliable than window.open for mailto in desktop clients
            window.location.href = mailto

            toast({
                position: 'top-right',
                title: 'Opening email client',
                description: 'Your default email client will open to send the message directly.',
                status: 'info',
                duration: 5000,
                isClosable: true,
            })

            return
        }

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                toast({
                    position: 'top-right',
                    title: 'Email Sent ✔',
                    description: `Thank You ${form.current.from_name.value.split(" ")[0]} for the message!`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                form.current.reset();
            })
            .catch((error) => {
                console.error('EmailJS error:', error)
                const msg = (error && (error.text || error.message)) ? (error.text || error.message) : 'There was an error sending the email.'
                toast({
                    position: 'top-right',
                    title: 'Email Not sent.',
                    description: msg,
                    status: 'warning',
                    duration: 7000,
                    isClosable: true,
                })
        })

    };

    return (
        <Box>
            <Box id='home'>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'row']} m="auto" justifyContent="space-around" alignItems="center" h="100%">
                    <Box data-aos="fade-down">
                        <Heading>Hey! <span className='themeText'>I'm</span></Heading>
                        <Box className='content'>
                            <Heading fontSize="3.3em" className='text' data-text="Dharani S R"><span className='themeText'>Dharani S R</span></Heading>
                        </Box>
                        <Text>A Python Developer passionate about problem-solving and building scalable applications with growing proficiency in web technologies.</Text>
                        <HStack className='hireMe' onClick={() => { window.open("https://drive.google.com/file/d/1jBa-w_YRCtrqAD7xrFaRw20mwkTO6QhH/view", '_blank') }}>
                            <a href={Resume} download="Dharani-Resume">
                                <Button>Resume <LuCloudDownload /></Button>
                            </a>
                        </HStack>
                    </Box>
                    <Box data-aos="fade-down">
                        <Svg1 />
                    </Box>
                </Flex>
            </Box>

            {/* About me */}

            <Box id="aboutMe">
                <Heading>About <span className='themeText'>me</span></Heading>
                <Flex flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row']} alignItems="center" h="100%">
                    <div data-aos="fade-right">
                        <Svg3 />
                    </div>

                    <Flex data-aos="fade-left">
                        <Flex w="100%" gap="10%" justifyContent="center">
                            <Image
                                borderRadius='full'
                                boxSize='250px'
                                src='/portfolio-profile-pic.webp'
                                alt='Dharani S R Avatar' />
                            <Svg3 />
                        </Flex>

                        <Box>
                            <Text>Computer Science graduate with a strong foundation in programming concepts and practical exposure to Python through self-learning and hands-on projects. Currently working in recruitment with a keen interest in transitioning into the IT field. Skilled in problem-solving, logical thinking, and continuous learning, with growing proficiency in Python programming and data handling. Eager to apply technical knowledge in real-world projects and build a successful career in the IT domain.</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Educational history */}
            <Box className="education-timeline">
                <Heading>Education
                    <span className="themeText"> History</span>
                </Heading>
                <Box className='timeline'>
                    <ul>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">B.E. in Computer Science and Engineering</Heading>
                                <Text>
                                    <Link href='https://www.annamalaiuniversity.ac.in/' target='_blank'>Annamalai University</Link> | Chidambaram, Tamil Nadu</Text>
                            </Box>
                            <Box className='time'>
                                <Text>2018 - 2022 | CGPA: 8.09/10</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">HSC (Higher Secondary Certificate)</Heading>
                                <Text>State Board | Tamil Nadu</Text>
                            </Box>
                            <Box className='time'>
                                <Text>2018 | 63.58%</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">SSLC (Secondary School Leaving Certificate)</Heading>
                                <Text>State Board | Tamil Nadu</Text>
                            </Box>
                            <Box className='time'>
                                <Text>2016 | 86.80%</Text>
                            </Box>
                        </li>
                    </ul>
                </Box>
            </Box>

            {/* Technical Skills section */}
            <Box id="skills">
                <Heading>
                    Technical
                    <span className="themeText"> Skills</span>
                </Heading>
                <Flex className='skills'>
                    <Flex>
                        <Heading size="lg">Front<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "frontend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-up">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Back<span className='themeText'>end</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "backend").map(skill => <Box
                                    key={skill.id}
                                    className="skill"
                                    data-aos="zoom-in-down">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                    <Flex>
                        <Heading size="lg">Platforms <span className='themeText'>& Tools</span></Heading>
                        <Box>
                            {
                                skills.filter((el) => el.tag === "platform").map(skill => <Box
                                    key={skill.id} className="skill"
                                    data-aos="zoom-in">
                                    <Box>
                                        <Image src={skill.icon} alt={`${skill.title} icon`} />
                                    </Box>
                                    <Text>{skill.title}</Text>
                                </Box>)
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* Professional experience */}
            <Box className="experience-timeline">
                <Heading>Professional
                    <span className="themeText"> Experience</span>
                </Heading>
                <Box className='timeline'>
                    <ul>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">Recruitment Specialist</Heading>
                                <Text>
                                    <Link href='https://zigsaw.co/' target='_blank'>Zigsaw</Link> (Remote)</Text>
                            </Box>
                            <Box className='time'>
                                <Text>Nov 2024 - Present</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">Human Resource (HR) Intern</Heading>
                                <Text>
                                    <Link href='https://zigsaw.co/' target='_blank'>Zigsaw</Link> (Remote)</Text>
                            </Box>
                            <Box className='time'>
                                <Text>Jul 2024 - Oct 2024</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">Software Engineer Intern</Heading>
                                <Text>
                                    <Link href='https://gaotek.com/' target='_blank'>GAOTek</Link> (Remote)</Text>
                            </Box>
                            <Box className='time'>
                                <Text>Dec 2022 - Jun 2023</Text>
                            </Box>
                        </li>
                        <li>
                            <Box className='content'>
                                <Heading size="lg">Data Analytics Intern</Heading>
                                <Text>Start-Tech Academy (Remote)</Text>
                            </Box>
                            <Box className='time'>
                                <Text>Nov 2022</Text>
                            </Box>
                        </li>
                    </ul>
                </Box>
            </Box>

            {/* show projects */}
            <Box id="projects">
                <Heading textAlign="center">Featured <span className='themeText'>Projects</span></Heading>
                <Carousel
                    containerClass="carousel-container"
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    keyBoardControl={true}
                    responsive={responsive}
                    infinite={false}>
                    {
                        projects.map((project) => <ProjectCard key={project.id} {...project} />)
                    }
                </Carousel>
            </Box>


            {/* Github Statistics removed as requested */}


            {/* Contact me */}
            <Box id='contactMe'>
                <Heading textAlign="center">Contact <span className='themeText'>Me</span></Heading>
                <Flex flexDirection={["column", "column", "column", "row"]} alignItems="center">

                    <Box>
                        <Svg2 />
                    </Box>


                    <Box className='form-section'>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className='inputBox'>
                                <input type="text" name="from_name" required />
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="email" name="from_mail" required />
                                <span>Email</span>
                            </div>
                            <div>
                                <textarea placeholder='Message 📧' name="message" />
                            </div>
                            <input type="submit" value="Send Message" />
                        </form>
                        <Flex className='contact-info'>
                            <HStack>
                                <SiGmail color="#e34133" />
                                <Text>dharanisr2000@gmail.com</Text>
                            </HStack>
                            <HStack>
                                <FaPhoneAlt color="#00a14f" />
                                <Text>+91 9361166083</Text>
                            </HStack>
                        </Flex>
                        <Flex gap={["10px", "20px", "20px", "40px"]}>
                            <Link href='https://wa.me/919361166083' target="_blank">
                                <Tooltip label='+91 9361166083'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://brandlogos.net/wp-content/uploads/2018/10/whatsapp-logo.png" alt='Whatsapp brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href='https://www.linkedin.com/in/dharani-sr-8a1121258/' target="_blank">
                                <Tooltip label='Dharani S R'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://openvisualfx.com/wp-content/uploads/2019/10/linkedin-icon-logo-png-transparent.png" alt='Linkedin brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="https://github.com/DharaniSR" target="_blank">
                                <Tooltip label='DharaniSR'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='Github brand logo' />
                                        </Box>
                                    </Box>
                                </Tooltip>
                            </Link>

                            <Link href="mailto:dharanisr2000@gmail.com" target="_blank">
                                <Tooltip label='dharanisr2000@gmail.com'>
                                    <Box className='social-icons'>
                                        <Box>
                                            <Image w="100%" src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt='Gmail brand logo' />
                                        </Box>
                                    </Box >
                                </Tooltip>
                            </Link>
                        </Flex >
                    </Box >
                </Flex >
            </Box >

            {/* footer */}
            <Flex id='footer'>
            </Flex>
        </Box >
    )
}

export default Home