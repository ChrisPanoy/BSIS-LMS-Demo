/**
 * SRC LMS Static Demo - Sidebar Script v3
 * - Injects sidebar after DOM is ready (DOMContentLoaded)
 * - Detects current role from URL path
 * - Highlights active link
 * - Smooth icon initialization after lucide loads
 */

(function () {
    'use strict';

    // ── Role Detection ───────────────────────────────────────────────────────
    const currentPath = window.location.pathname;
    let role = 'ADMIN';
    if (currentPath.includes('/student/')) role = 'STUDENT';
    else if (currentPath.includes('/faculty/')) role = 'FACULTY';

    // ── Root Path Resolver ───────────────────────────────────────────────────
    const isSubfolder = (
        currentPath.includes('/admin/') ||
        currentPath.includes('/student/') ||
        currentPath.includes('/faculty/') ||
        currentPath.includes('/auth/')
    );
    const root = isSubfolder ? '../' : './';

    // ── Nav Items ────────────────────────────────────────────────────────────
    const menuItems = {
        ADMIN: [
            { icon: 'layout-dashboard', label: 'Overview',          path: 'index.html' },
            { icon: 'layers',           label: 'LMS Management',    path: 'admin/management.html' },
            { icon: 'book-open',        label: 'All Quizzes',       path: 'admin/quizzes.html' },
            { icon: 'users',            label: 'User Management',   path: 'admin/users.html' },
            { icon: 'calendar-days',    label: 'Academic Year',     path: 'admin/academic-year.html' },
            { icon: 'palette',          label: 'Branding Settings', path: 'admin/branding.html' },
        ],
        FACULTY: [
            { icon: 'layout-dashboard', label: 'Dashboard',           path: 'faculty/dashboard.html' },
            { icon: 'bell',             label: 'Announcements',       path: 'faculty/announcements.html' },
            { icon: 'file-text',        label: 'Assignments',         path: 'faculty/assignments.html' },
            { icon: 'zap',              label: 'Interactive Quiz',    path: 'faculty/interactive-quiz.html' },
            { icon: 'video',            label: 'Virtual Classroom',   path: 'faculty/classroom.html' },
            { icon: 'shield-alert',     label: 'Monitoring',          path: 'faculty/monitoring.html' },
            { icon: 'message-square',   label: 'Direct Messages',     path: 'faculty/messages.html' },
        ],
        STUDENT: [
            { icon: 'layout-dashboard', label: 'Home Feed',         path: 'student/dashboard.html' },
            { icon: 'bell',             label: 'Notices',           path: 'student/announcements.html' },
            { icon: 'file-text',        label: 'Assignments',       path: 'student/assignments.html' },
            { icon: 'video',            label: 'Online Class',      path: 'student/classroom.html' },
            { icon: 'message-square',   label: 'Faculty Chat',      path: 'student/messages.html' },
            { icon: 'calendar-days',    label: 'Schedule',          path: 'student/calendar.html' },
            { icon: 'user-circle',      label: 'My Profile',        path: 'student/profile.html' },
        ]
    };

    const navItems = menuItems[role] || menuItems.ADMIN;

    const demoPortals = [
        { icon: 'shield',         label: 'Admin View',   path: 'index.html' },
        { icon: 'graduation-cap', label: 'Student View', path: 'student/dashboard.html' },
        { icon: 'presentation',   label: 'Faculty View', path: 'faculty/dashboard.html' },
    ];

    // ── Role display info ────────────────────────────────────────────────────
    const roleInfo = {
        ADMIN:   { name: 'Admin User',    badge: 'ADMIN Dashboard',   avatarLetter: 'A' },
        FACULTY: { name: 'Faculty User',  badge: 'FACULTY Dashboard', avatarLetter: 'F' },
        STUDENT: { name: 'John Doe',      badge: 'STUDENT Dashboard', avatarLetter: 'JD' },
    };
    const currentRole = roleInfo[role];

    // ── Active link detection ─────────────────────────────────────────────────
    function isActive(item) {
        const pathEnd = item.path.split('/').pop();
        // Exact filename match
        if (currentPath.endsWith('/' + pathEnd)) return true;
        if (currentPath.endsWith(pathEnd)) return true;
        return false;
    }

    // ── Render nav items ─────────────────────────────────────────────────────
    function navItem(item) {
        const href = root + item.path;
        const active = isActive(item);
        return `
            <a href="${href}" class="nav-link${active ? ' active' : ''}">
                <div class="nav-link-content">
                    <i data-lucide="${item.icon}" class="nav-icon"></i>
                    <span class="nav-label">${item.label}</span>
                </div>
                <i data-lucide="chevron-right" class="nav-chevron"></i>
            </a>`;
    }

    function portalItem(portal) {
        const href = root + portal.path;
        const active = isActive(portal);
        return `
            <a href="${href}" class="nav-link portal-item${active ? ' active' : ''}">
                <div class="nav-link-content">
                    <i data-lucide="${portal.icon}" class="nav-icon" style="color: #818cf8;"></i>
                    <span class="nav-label">${portal.label}</span>
                </div>
            </a>`;
    }

    // ── Sidebar HTML ─────────────────────────────────────────────────────────
    const sidebarHTML = `
        <aside class="sidebar" id="main-sidebar">
            <div class="sidebar-header">
                <div class="logo-container">
                    <img
                        src="${root}assets/logo.png"
                        alt="SRC LMS"
                        class="system-logo"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >
                    <div class="logo-fallback" style="display:none; width:80px; height:80px; background:rgba(99,102,241,0.12); border-radius:1.5rem; align-items:center; justify-content:center; margin:0 auto;">
                        <i data-lucide="graduation-cap" style="width:42px; height:42px; color:#818cf8;"></i>
                    </div>
                    <h2 class="system-name">BSIS LMS</h2>
                </div>
            </div>

            <nav class="sidebar-nav no-scrollbar">
                <div class="nav-section-label">Main Navigation</div>
                ${navItems.map(navItem).join('')}

                <div class="nav-section-label" style="margin-top: 2rem;">Portal Demo</div>
                ${demoPortals.map(portalItem).join('')}
            </nav>

            <div class="sidebar-user">
                <div class="user-card">
                    <div class="user-info">
                        <div class="user-avatar">${currentRole.avatarLetter}</div>
                        <div class="user-details">
                            <h4>${currentRole.name}</h4>
                            <p>${currentRole.badge}</p>
                        </div>
                    </div>
                    <a href="${root}auth/login.html" class="sign-out-btn" onclick="return confirm('Exit demo? (Sign out is simulated)')">
                        <i data-lucide="log-out" style="width:16px;height:16px;"></i>
                        SIGN OUT
                    </a>
                </div>
            </div>
        </aside>`;

    // ── Inject sidebar into container ─────────────────────────────────────────
    function injectSidebar() {
        const container = document.getElementById('sidebar-container');
        if (container) {
            container.innerHTML = sidebarHTML;
        }
    }

    // ── Initialize Lucide icons ───────────────────────────────────────────────
    function initIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // ── Main execution — wait for DOM ─────────────────────────────────────────
    function init() {
        injectSidebar();

        // ── Mobile Hamburger ──────────────────────────────────────────────
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburger-btn';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
        hamburger.style.cssText = `
            display: none;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1100;
            width: 2.75rem;
            height: 2.75rem;
            background: #0f172a;
            color: white;
            border: none;
            border-radius: 0.75rem;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(0,0,0,0.25);
            transition: all 0.2s ease;
        `;
        document.body.appendChild(hamburger);

        // Overlay backdrop
        const overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.style.cssText = `
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            z-index: 1050;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            opacity: 0;
            transition: opacity 0.25s ease;
        `;
        document.body.appendChild(overlay);

        function openSidebar() {
            const sidebarEl = document.getElementById('main-sidebar');
            const container = document.getElementById('sidebar-container');
            if (sidebarEl) sidebarEl.classList.add('mobile-open');
            if (container) container.classList.add('mobile-open');
            overlay.style.display = 'block';
            requestAnimationFrame(() => { overlay.style.opacity = '1'; });
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            const sidebarEl = document.getElementById('main-sidebar');
            const container = document.getElementById('sidebar-container');
            if (sidebarEl) sidebarEl.classList.remove('mobile-open');
            if (container) container.classList.remove('mobile-open');
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.style.display = 'none'; }, 250);
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', openSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Show/hide hamburger based on viewport
        function checkMobile() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'flex';
            } else {
                hamburger.style.display = 'none';
                closeSidebar();
            }
        }
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Icons need a tiny delay to ensure Lucide's CDN load is complete
        if (window.lucide) {
            lucide.createIcons();
        } else {
            // If Lucide not ready, poll briefly
            let attempts = 0;
            const poll = setInterval(function () {
                attempts++;
                if (window.lucide) {
                    lucide.createIcons();
                    clearInterval(poll);
                } else if (attempts > 20) {
                    clearInterval(poll);
                }
            }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
