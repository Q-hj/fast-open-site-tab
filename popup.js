/**
 * 网站列表配置
 */
const SITE_LIST = [
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
];

/**
 * 渲染网站列表
 */
function renderSiteList() {
  const listEl = document.getElementById("siteList");

  SITE_LIST.forEach((site) => {
    const li = document.createElement("li");
    li.className = "site-item";
    li.innerHTML = `
      <div class="site-icon" style="background-color: ${site.color}">${site.icon}</div>
      <span class="site-name">${site.name}</span>
      <span class="site-arrow">→</span>
    `;

    li.addEventListener("click", () => {
      chrome.tabs.create({ url: site.url });
    });

    listEl.appendChild(li);
  });
}

// 初始化
renderSiteList();
