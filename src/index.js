import { 
    QMainWindow, 
    QLabel, 
    QWidget, 
    FlexLayout, 
    QPushButton, 
    QLineEdit, 
    QPlainTextEdit } from "@nodegui/nodegui";
import axios from "axios";

async function fetchWebPage(url) {
    const { data } = await axios.get(url)
    console.log(data)
    return data;
}

async function main() {
    const win = new QMainWindow();
    win.setWindowTitle("Little Node Browser");
    win.resize(600, 600);

    const centralWidget = new QWidget(); 
    const centralLayout = new FlexLayout();
    centralWidget.setObjectName("myroot");
    centralWidget.setLayout(centralLayout);

    //const { data } = await axios.get("http://www.example.com/")
    //console.log(typeof data)
// ---------------------------------- URL BAR ----------------------------------
    const urlBar = new QWidget();
    const urlBarLayout = new FlexLayout();
    urlBar.setObjectName("urlBar");
    urlBar.setLayout(urlBarLayout);

    const label = new QLabel();
    label.setObjectName("addressBar");
    label.setText("Address");

    const inputBox = new QLineEdit();
    inputBox.setObjectName("inputBox");

    const searchButton = new QPushButton();
    searchButton.setObjectName("searchBtn");
    searchButton.setText("Search");

    urlBarLayout.addWidget(label);
    urlBarLayout.addWidget(inputBox);
    urlBarLayout.addWidget(searchButton);

// ------------------------------ PAGE DISPLAY -------------------------------
    const pageDisplay = new QPlainTextEdit();
    pageDisplay.setObjectName("pageDisplay");
    pageDisplay.setReadOnly(true);

// ------------------------------- FUNCTIONALITY -----------------------------
    searchButton.addEventListener('clicked', async () => {
        const enteredUrl = inputBox.text();
        const response = await fetchWebPage(enteredUrl)
        console.log(response)

        pageDisplay.setPlainText(response);
    })

// ----------------------------- MAIN WINDOW ----------------------------------
    centralLayout.addWidget(urlBar);
    centralLayout.addWidget(pageDisplay)
    
    const rootStyleSheet = `
        #myroot {
            height: 100%;
        }
        #urlBar {
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
        }
        #inputBox {
            width: 300px;
        }
        #pageDisplay {
            height: 500px;
        }
    `;
    centralWidget.setStyleSheet(rootStyleSheet);

    win.setCentralWidget(centralWidget);
    win.show();

    global.win = win;
}

main().catch(err => console.log(err))