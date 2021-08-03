import { QMainWindow, QLabel, Qwidget } from "@nodegui/nodegui";
import axios from "axios";

async function fetchWebPage(url) {
    //const { data } = await axios.get("http://www.example.com/")
console.log('other function')
    //console.log(data)
    //return data;
    // const webPage = new QLabel();
    // webPage.setText(data)
    // return webPage;
}

fetchWebPage()

async function main() {
    const win = new QMainWindow();
    win.setWindowTitle("Little Node Browser");
console.log('main function')

    const { data } = await axios.get("http://www.example.com/")
    console.log(typeof data)
    const label = new QLabel();
    //const webPage = await fetchWebPage();
    label.setText(data);

    win.setCentralWidget(label);
    win.show();

    global.win = win;
}

main().catch(err => console.log(err))