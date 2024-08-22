export const colorHandlerOnce = () => {
  const once = document.querySelector("div.once");
  if (!once) {
    console.warn("No element found with selector 'div.once'");
    return;
  }

  const avg_list = once.querySelector("table.avgList");
  if (!avg_list) {
    console.warn(
      "No element found with selector 'table.avgList' inside 'div.once'"
    );
    return;
  }

  const PM10 = avg_list.querySelectorAll("td.PM10");
  const PM25 = avg_list.querySelectorAll("td.PM25");

  const applyColorPM10 = (PM10List) => {
    PM10List.forEach((PM10) => {
      const value = parseFloat(PM10.textContent);
      if (isNaN(value)) return;
      PM10.style.color = "white";
      if (value >= 151) {
        PM10.style.backgroundColor = "#e64746";
      } else if (value >= 81 && value <= 150) {
        PM10.style.backgroundColor = "#fda60d";
      } else if (value >= 31 && value <= 80) {
        PM10.style.backgroundColor = "#02bc30";
      } else if (value <= 30) {
        PM10.style.backgroundColor = "#2286f7";
      }
    });
  };

  const applyColorPM25 = (PM25List) => {
    PM25List.forEach((PM25) => {
      const value = parseFloat(PM25.textContent);
      if (isNaN(value)) return;
      PM25.style.color = "white";
      if (value >= 76) {
        PM25.style.backgroundColor = "#e64746";
      } else if (value >= 36 && value <= 75) {
        PM25.style.backgroundColor = "#fda60d";
      } else if (value >= 16 && value <= 35) {
        PM25.style.backgroundColor = "#02bc30";
      } else if (value <= 15) {
        PM25.style.backgroundColor = "#2286f7";
      }
    });
  };

  applyColorPM10(PM10);
  applyColorPM25(PM25);
};

export const colorHandlerDetail = () => {
  const detail = document.querySelector("article.detail");
  if (!detail) {
    console.warn("No element found with selector 'article.detail'");
    return;
  }

  const detail_list = detail.querySelector("ul.finedust-list");
  if (!detail_list) {
    console.warn(
      "No element found with selector 'ul.finedust-list' inside 'article.detail'"
    );
    return;
  }

  const PM10 = detail_list.querySelectorAll("span.PM10");
  const PM25 = detail_list.querySelectorAll("span.PM25");

  const applyColorPM10 = (PM10List) => {
    PM10List.forEach((PM10) => {
      const value = parseFloat(PM10.textContent);
      if (isNaN(value)) return;
      PM10.style.color = "white";
      if (value >= 151) {
        PM10.style.backgroundColor = "#e64746";
      } else if (value >= 81 && value <= 150) {
        PM10.style.backgroundColor = "#fda60d";
      } else if (value >= 31 && value <= 80) {
        PM10.style.backgroundColor = "#02bc30";
      } else if (value <= 30) {
        PM10.style.backgroundColor = "#2286f7";
      }
    });
  };

  const applyColorPM25 = (PM25List) => {
    PM25List.forEach((PM25) => {
      const value = parseFloat(PM25.textContent);
      if (isNaN(value)) return;
      PM25.style.color = "white";
      if (value >= 76) {
        PM25.style.backgroundColor = "#e64746";
      } else if (value >= 36 && value <= 75) {
        PM25.style.backgroundColor = "#fda60d";
      } else if (value >= 16 && value <= 35) {
        PM25.style.backgroundColor = "#02bc30";
      } else if (value <= 15) {
        PM25.style.backgroundColor = "#2286f7";
      }
    });
  };

  applyColorPM10(PM10);
  applyColorPM25(PM25);
};
