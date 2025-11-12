import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import '../Styles/ThemeToggle.css'

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'light') {
            setIsDarkMode(false)
            applyTheme(false)
        } else {
            setIsDarkMode(true)
            applyTheme(true)
        }
    }, [])

    const applyTheme = (isDark) => {
        const root = document.documentElement
        if (isDark) {
            root.setAttribute('data-theme', 'dark')
        } else {
            root.setAttribute('data-theme', 'light')
        }
    }

    const handleToggle = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)
        applyTheme(newMode)
        localStorage.setItem('theme', newMode ? 'dark' : 'light')
    }

    return (
        <Box className="theme-toggle-container">
            <div className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} onClick={handleToggle}>
                <div className="toggle-circle"></div>
                <span className="toggle-icon">{isDarkMode ? '🌙' : '☀️'}</span>
            </div>
        </Box>
    )
}

export default ThemeToggle
