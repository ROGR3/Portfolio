const PROJECTS = {
  orchidei: {
    percentage: 90,
    name: "Orchidei",
    class: "orchidei-img",
    link: "https://orchidei.netlify.app/",
    text: "Modern file manager that allows you to share your files across multiple devices. It is completely open-source and free to use. So what are you waiting for?"
  },
  cassandra: {
    percentage: 60,
    name: "Cassandra",
    class: "cassandra-img",
    link: "https://github.com/Borecjeborec1/Cassandra",
    text: "Easy to use binding software. Unlike other simulating applications, Cassandra is cross-platform so you can run it on Linux or MacOS."
  },
  npm: {
    percentage: 100,
    name: "NPM packages",
    class: "npm-img",
    link: "https://lepikjs.netlify.app/",
    text: "As NodeJS is my primary using technology, I developed a lot of npm packages. Containing LepikJS, LepikEvents, Kohut, KotasJS, Atzuki-Dollar and so much more!"
  },
  pobu: {
    percentage: 60,
    name: "Pobu language",
    class: "pobu-img",
    link: "https://github.com/Borecjeborec1/Pobu",
    text: "Pobu is a programming language for creating scripts and simulating user-like events. It is using C++ in its core as an addon for NodeJS."
  },
  discord: {
    percentage: 40,
    name: "Discord bot",
    class: "dc-img",
    link: "https://github.com/Borecjeborec1/ryme",
    text: "Because of popular discord bots shutdown I decided to create my own discord bots. Ryme, youtube song player, is currently running on many servers."
  },
  boknom: {
    percentage: 20,
    name: "Boknom game",
    class: "boknom-img",
    link: "https://github.com/TomZMarsu/Boknom1",
    text: "You are the meteor. Destroy the Earth faster than the Earth air-forces destroy you. Avalaible on Android and iOS."
  },
  kotasjs: {
    percentage: 10,
    name: "KotasJS",
    class: "kotas-img",
    link: "https://kotasjs.netlify.app/",
    text: "JavaScript library for creating and handling mouse gestures. Extremely light-weight and simple to use"
  },
  ipen: {
    percentage: 90,
    name: "iPen",
    class: "ipen-img",
    link: "https://ipen.netlify.app/",
    text: "iPen is a minimal application for drawing on the screen. It provides a simple interface for users to create drawings using various tools and shortcuts."
  },
  tachuela: {
    percentage: 90,
    name: "Tachuela",
    class: "tachuela-img",
    link: "https://tachuela-app.netlify.app/",
    text: "Tachuela is a powerful mobile checklist app designed to help you stay organized and boost your productivity. Whether you're managing daily tasks, or setting goals Tachuela has got you covered."
  },
  pequena: {
    percentage: 90,
    name: "Pequena",
    class: "pequena-img",
    link: "https://pequena.netlify.app/",
    text: "Pequena is a desktop creation framework that allows you to create desktop applications using web technologies such as HTML, CSS, and JavaScript."
  }
};


function handleProjects() {
  let wrapper = document.querySelector("#projects .content");
  let projectKeys = Object.keys(PROJECTS);
  let randomProjects = getRandomProjects(projectKeys, 6);
  let allProjects = "";

  for (let i of randomProjects) {
    const PROJECT_HTML = `<a class="project" target="_blank" rel="noopener noreferrer" href="${PROJECTS[i].link}">
      <h3 class="projectName">${PROJECTS[i].name}</h3>
      <div class="img ${PROJECTS[i].class}"></div>
      <p class="projectInfo">
        ${PROJECTS[i].text}
      </p>
    </a>`;
    allProjects += PROJECT_HTML;
  }

  wrapper.innerHTML = allProjects;
}

function getRandomProjects(array, count) {
  let weightedArray = [];

  for (let i of array) {
    for (let j = 0; j < PROJECTS[i].percentage; j++) {
      weightedArray.push(i);
    }
  }

  let uniqueProjects = [];

  while (uniqueProjects.length < count) {
    let randomIndex = Math.floor(Math.random() * weightedArray.length);
    let project = weightedArray[randomIndex];

    if (!uniqueProjects.includes(project)) {
      uniqueProjects.push(project);
    }
  }

  return uniqueProjects;
}

handleProjects()
