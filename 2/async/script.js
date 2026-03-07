function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

let activeModalResolver = null;

function ensureInputModal() {
    if (document.getElementById("input-modal-overlay")) {
        return;
    }

    const style = document.createElement("style");
    style.textContent = `
        #input-modal-overlay {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.25);
        }
        #input-modal-box {
            width: 340px;
            padding: 12px;
            border: 1px solid #d0d0d0;
            background: #fff;
        }
        #input-modal-title {
            margin: 0 0 8px;
        }
        #input-modal-field {
            width: 100%;
            padding: 8px;
            margin-bottom: 8px;
            border: 1px solid #c8c8c8;
        }
        #input-modal-actions {
            display: flex;
            justify-content: flex-end;
        }
        #input-modal-actions button {
            padding: 6px 10px;
            border: 1px solid #c8c8c8;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "input-modal-overlay";
    overlay.innerHTML = `
        <div id="input-modal-box">
            <h2 id="input-modal-title"></h2>
            <input id="input-modal-field" type="text" />
            <div id="input-modal-actions">
                <button id="input-modal-cancel" type="button">Cancel</button>
                <button id="input-modal-ok" type="button">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const input = document.getElementById("input-modal-field");
    const okBtn = document.getElementById("input-modal-ok");
    const cancelBtn = document.getElementById("input-modal-cancel");

    function closeWithResult(result) {
        if (!activeModalResolver) {
            return;
        }

        const resolver = activeModalResolver;
        activeModalResolver = null;
        overlay.style.display = "none";
        resolver(result);
    }

    okBtn.addEventListener("click", () => {
        closeWithResult({ cancelled: false, value: input.value });
    });

    cancelBtn.addEventListener("click", () => {
        closeWithResult({ cancelled: true, value: null });
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            closeWithResult({ cancelled: false, value: input.value });
        }

        if (event.key === "Escape") {
            closeWithResult({ cancelled: true, value: null });
        }
    });
}

function showInputModal(title, placeholder) {
    ensureInputModal();

    const overlay = document.getElementById("input-modal-overlay");
    const titleEl = document.getElementById("input-modal-title");
    const input = document.getElementById("input-modal-field");

    titleEl.textContent = title;
    input.value = "";
    input.placeholder = placeholder || "";
    overlay.style.display = "flex";

    setTimeout(() => {
        input.focus();
    }, 0);

    return new Promise((resolve) => {
        activeModalResolver = resolve;
    });
}

async function collectInputs(label, placeholder) {
    const values = [];

    for (let i = 0; i < 5; i++) {
        const result = await showInputModal(`Введите ${label} ${i + 1} из 5`, placeholder);

        if (result.cancelled) {
            return null;
        }

        values.push(result.value);
    }

    return values;
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Can't load image"));
        img.src = url;
    });
}

function createErrorParagraph() {
    const p = document.createElement("p");
    p.textContent = "Can’t load image";
    return p;
}

function showVisitCountOnLoad() {
    let count = Number(localStorage.getItem("page_load_count") || 0) + 1;
    localStorage.setItem("page_load_count", count);
    alert(`Вы загрузили/обновили эту страницу ${count} раз(а).`);
}

function task1() {
    const count = localStorage.getItem("page_load_count") || 0;
    alert(`Текущее количество загрузок страницы: ${count}`);
}

window.onload = showVisitCountOnLoad;

function task2() {
    const output = document.getElementById("output");
    collectInputs("URL картинки", "https://...").then((urls) => {
        if (urls === null) {
            return;
        }

        clearOutput();

        const promises = urls.map((url) =>
            loadImage(url).catch(() => createErrorParagraph())
        );

        Promise.all(promises).then((elements) => {
            elements.forEach((element) => output.appendChild(element));
        });
    });
}

function task3() {
    const output = document.getElementById("output");
    collectInputs("URL картинки", "https://...").then((urls) => {
        if (urls === null) {
            return;
        }

        clearOutput();

        urls.forEach((url) => {
            loadImage(url)
                .then((img) => output.appendChild(img))
                .catch(() => output.appendChild(createErrorParagraph()));
        });
    });
}

async function task4_ordered() {
    const output = document.getElementById("output");
    const urls = await collectInputs("URL картинки", "https://...");

    if (urls === null) {
        return;
    }

    clearOutput();

    const elements = await Promise.all(
        urls.map(async (url) => {
            try {
                return await loadImage(url);
            } catch {
                return createErrorParagraph();
            }
        })
    );

    elements.forEach((element) => output.appendChild(element));
}

async function task4_unordered() {
    const output = document.getElementById("output");
    const urls = await collectInputs("URL картинки", "https://...");

    if (urls === null) {
        return;
    }

    clearOutput();

    urls.forEach(async (url) => {
        try {
            const img = await loadImage(url);
            output.appendChild(img);
        } catch {
            output.appendChild(createErrorParagraph());
        }
    });
}

async function checkIp(ip) {
    const response = await fetch(`https://geoiplookup.io/api/${ip}`);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return response.json();
}

async function task5() {
    const blockedCountries = [
        "Russia",
        "Belarus",
        "Afghanistan",
        "China",
        "Venezuela",
        "Iran",
        "Russian Federation"
    ];

    const ips = await collectInputs("IP-адрес", "8.8.8.8");

    if (ips === null) {
        return;
    }

    try {
        const results = await Promise.all(ips.map((ip) => checkIp(ip)));
        const hasBlocked = results.some((item) =>
            blockedCountries.includes(item.country_name)
        );

        if (hasBlocked) {
            alert("Our services are not available in your country");
        } else {
            alert("Welcome to our website!");
        }
    } catch (error) {
        alert("Ошибка при проверке IP-адресов.");
        console.error(error);
    }
}
