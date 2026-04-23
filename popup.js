/**
 * 默认网站列表配置
 */
const DEFAULT_SITE_LIST = [
  {
    name: "豆包",
    url: "https://www.doubao.com/chat/",
    icon: "🫘",
    color: "#e8f3ff",
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    icon: "🐙",
    color: "#f6f8fa",
  },
  {
    name: "GitHub",
    url: "https://github.com/Q-hj",
    icon: "🐱",
    color: "#f6f8fa",
  },
  {
    name: "拓展中心",
    url: "edge://extensions/",
    icon: "🧩",
    color: "#38d9a9",
  },
];

/**
 * 存储键名
 */
const STORAGE_KEY = "siteList";

/**
 * 当前站点列表
 */
let currentSiteList = [];

/**
 * 初始化加载站点列表
 */
async function initSiteList() {
  const result = await chrome.storage.local.get([STORAGE_KEY]);
  currentSiteList = result[STORAGE_KEY] || DEFAULT_SITE_LIST;
  renderSiteList();
}

/**
 * 保存站点列表到本地存储
 */
async function saveSiteList() {
  await chrome.storage.local.set({ [STORAGE_KEY]: currentSiteList });
}

/**
 * 渲染网站列表
 */
function renderSiteList() {
  const listEl = document.getElementById("siteList");
  listEl.innerHTML = "";

  currentSiteList.forEach((site, index) => {
    const li = document.createElement("li");
    li.className = "site-item";
    li.innerHTML = `
      <div class="site-icon" style="background-color: ${site.color}">${site.icon}</div>
      <span class="site-name">${site.name}</span>
      <span class="site-arrow">→</span>
      <button class="delete-btn" data-index="${index}" title="删除">×</button>
    `;

    li.querySelector(".site-name").addEventListener("click", () => {
      chrome.tabs.create({ url: site.url });
    });

    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteSite(index);
    });

    listEl.appendChild(li);
  });
}

/**
 * 删除站点
 */
async function deleteSite(index) {
  const site = currentSiteList[index];
  if (confirm(`确定删除 "${site.name}"？`)) {
    currentSiteList.splice(index, 1);
    await saveSiteList();
    renderSiteList();
  }
}

/**
 * 添加新站点
 */
async function addSite() {
  const nameInput = document.getElementById("siteName");
  const urlInput = document.getElementById("siteUrl");
  const iconInput = document.getElementById("siteIcon");
  const colorInput = document.getElementById("siteColor");

  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  const icon = iconInput.value.trim() || "🌐";
  const color = colorInput.value || "#e8f3ff";

  if (!name) {
    alert("请输入网站名称");
    nameInput.focus();
    return;
  }

  if (!url) {
    alert("请输入网站地址");
    urlInput.focus();
    return;
  }

  // 校验 URL 格式
  if (!isValidUrl(url)) {
    alert("请输入有效的网站地址（如 https://example.com）");
    urlInput.focus();
    return;
  }

  const newSite = { name, url, icon, color };
  currentSiteList.push(newSite);
  await saveSiteList();
  renderSiteList();

  // 清空表单
  nameInput.value = "";
  urlInput.value = "";
  iconInput.value = "";
  colorInput.value = "#e8f3ff";

  // 切换回列表视图
  toggleView("list");
}

/**
 * 校验 URL 格式
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 切换视图
 */
function toggleView(view) {
  const listSection = document.getElementById("listSection");
  const addSection = document.getElementById("addSection");
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");

  if (view === "add") {
    listSection.style.display = "none";
    addSection.style.display = "block";
    addBtn.style.display = "none";
    backBtn.style.display = "block";
  } else {
    listSection.style.display = "block";
    addSection.style.display = "none";
    addBtn.style.display = "block";
    backBtn.style.display = "none";
  }
}

/**
 * 绑定事件
 */
function bindEvents() {
  // 新增按钮
  document.getElementById("addBtn").addEventListener("click", () => {
    toggleView("add");
  });

  // 返回按钮
  document.getElementById("backBtn").addEventListener("click", () => {
    toggleView("list");
  });

  // 提交按钮
  document.getElementById("submitBtn").addEventListener("click", addSite);

  // 回车提交
  document.getElementById("siteUrl").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addSite();
    }
  });
}

// 初始化
initSiteList();
bindEvents();
