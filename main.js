// ============================================
// Main JavaScript File
// Handles interactive functionality across all pages
// ============================================

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {

        // ============================================
        // Smooth scroll for anchor links
        // ============================================
        initSmoothScroll();

        // ============================================
        // Document preview modal functionality
        // ============================================
        initPreviewModal();

        // ============================================
        // Active navigation link highlighting
        // ============================================
        updateActiveNavLink();

    });

    // ============================================
    // Smooth Scroll Implementation
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Only process if it's a valid anchor
                if (href === '#') return;

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Document Preview Modal
    // ============================================
    function initPreviewModal() {
        const modal = document.getElementById('previewModal');

        // Return early if modal doesn't exist (not on docs page)
        if (!modal) return;

        const overlay = modal.querySelector('.modal__overlay');
        const closeButtons = modal.querySelectorAll('[data-close-modal]');
        const iframe = modal.querySelector('.modal__iframe');
        const previewButtons = document.querySelectorAll('[data-preview]');

        // Open modal on preview button click
        previewButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const pdfPath = this.getAttribute('data-preview');

                if (pdfPath) {
                    iframe.src = pdfPath;
                    modal.classList.add('modal--active');
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';

                    // Focus on close button for accessibility
                    const closeButton = modal.querySelector('.modal__close');
                    if (closeButton) {
                        closeButton.focus();
                    }
                }
            });
        });

        // Close modal functions
        function closeModal() {
            modal.classList.remove('modal--active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            iframe.src = '';
        }

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }

        // Close on close button click
        closeButtons.forEach(function(button) {
            button.addEventListener('click', closeModal);
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
                closeModal();
            }
        });
    }

    // ============================================
    // Update Active Navigation Link
    // ============================================
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');

            // Remove active class from all links
            link.classList.remove('nav__link--active');

            // Add active class to current page link
            if (href === currentPage) {
                link.classList.add('nav__link--active');
            }
        });
    }

})();
