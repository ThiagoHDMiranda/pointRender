const body = document.getElementById("body");
const bodyPage = document.getElementById("bodyPage");
const navBar = document.getElementById("navBar");
const divPointColor = document.getElementById("divPointColor");
const inputPointColor = document.getElementById("inputPointColor");
const drawer = document.getElementById("drawer");
const divPointSize = document.getElementById("divPointSize");
const inputPointSize = document.getElementById("inputPointSize");
const lblPointSize = document.getElementById("lblPointSize");
const addCount = document.getElementById("addCount");
const decreaseCount = document.getElementById("decreaseCount");

let pointCount = 0;
let pointColor = "red";
let pointSize = 5;
let drawerIsLoked = false;
let drawerIsOpen = false;

const donePoints = [];
const pointsRemoved = [];

function undoPoint() {
  const removeDiv = donePoints.pop();
  pointsRemoved.push(removeDiv);
  body.removeChild(removeDiv);
}

function redoPoint() {
  const addDiv = pointsRemoved.pop();
  donePoints.push(addDiv);
  body.appendChild(addDiv);
}

function createPoint(ev) {
  const x = ev.offsetX - pointSize / 2;
  const y = ev.offsetY - pointSize / 2;

  const div = document.createElement("div");
  const nameDiv = "div" + pointCount++;
  div.id = nameDiv;
  div.style.width = pointSize + "px";
  div.style.height = pointSize + "px";
  div.style.backgroundColor = pointColor;
  div.style.position = "absolute";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.borderRadius = "50%";
  div.style.zIndex = 1;
  body.appendChild(div);
  donePoints.push(div);
}

function keyPress(ev) {
  if (ev.ctrlKey) {
    switch (ev.key.toLowerCase()) {
      case "c":
        openColorPicker();
        break;
      case "v":
        navBar.style.zIndex = 5;
        openDrawer();
        break;
      case "x":
        if (drawerIsOpen) {
          closeDrawer();
        }
        toggleLock();
        break;
      case "y":
        if (pointsRemoved.length > 0) {
          redoPoint();
        }
        break;
      case "z":
        if (donePoints.length > 0) {
          undoPoint();
        }
        break;
    }
  }
}

function toggleLock() {
  if (drawerIsLoked) {
    navBar.style.zIndex = 5;
    loked.style.width = "0vw";
  } else {
    navBar.style.zIndex = 3;
    loked.style.width = "5vw";
  }
  drawerIsLoked = !drawerIsLoked;
}

function closeDrawer() {
  drawerIsOpen = false;
  divPointSize.style.width = "0.5vw";
  lblPointSize.style.paddingLeft = "1.5vh";
}

function openDrawer() {
  drawerIsOpen = true;
  divPointSize.style.width = "16vw";
  lblPointSize.style.paddingLeft = "16.5vw";
}

function openColorPicker() {
  inputPointColor.showPicker();
}

function changingPointSize() {
  inputPointSize.value = pointSize;
  lblPointSize.innerText = pointSize;
}

function changePointColor(ev) {
  pointColor = ev.target.value;
  divPointColor.style.backgroundColor = pointColor;
}

function mouseLeaveDreawer() {
  closeDrawer();
  if (drawerIsLoked) {
    navBar.style.zIndex = 3;
  }
}

function clickAddCount() {
  if (pointSize < inputPointSize.max) {
    pointSize++;
    changingPointSize();
  }
}

function clickDecreaseCount() {
  if (pointSize > inputPointSize.min) {
    pointSize--;
    changingPointSize();
  }
}

function changePointSize(ev) {
  pointSize = Number(ev.target.value);
  lblPointSize.innerText = ev.target.value;
}

function mouseDownBody(ev) {
  if (drawerIsOpen === true) {
    closeDrawer();
  }
  if (drawerIsLoked) {
    navBar.style.zIndex = 3;
  }
  createPoint(ev);
  bodyPage.addEventListener("mousemove", createPoint);
}

document.onkeydown = keyPress;

divPointColor.addEventListener("mouseover", openColorPicker);
inputPointColor.addEventListener("change", changePointColor);

drawer.addEventListener("mouseover", openDrawer);
drawer.addEventListener("mouseleave", mouseLeaveDreawer);

addCount.addEventListener("click", clickAddCount);

decreaseCount.addEventListener("click", clickDecreaseCount);

inputPointSize.addEventListener("change", changePointSize);

bodyPage.addEventListener("mousedown", mouseDownBody);

bodyPage.addEventListener("mouseup", () => {
  bodyPage.removeEventListener("mousemove", createPoint);
});
