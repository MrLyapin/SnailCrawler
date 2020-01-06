
const fs = require('fs');
const colors = require('colors');
const dateformat = require('dateformat');

const player = require('node-wav-player');


const startURL = "https://www.google.com";
const links = "div.r > a";


let currentURL = startURL;
let stopURL = 'http://stop/';
let text;
let timer;

let findElements;
let arrLinks = [];
let uniqLinks = new Set();
let uniqLinksSize;
let done = false;
let parseOk = 0;




describe(startURL + ' page', () => {
    it('SnailCrawler => done', () => {






        browser.url(currentURL); // open start page
        while (browser.getUrl() !== stopURL) { // loop

            uniqLinksSize = uniqLinks.size; // start = 0;

            if ($(links).isExisting()) { // check element
                timer = Date.now(); // set date now
                findElements = $$(links);
                for (let i of findElements) {
                    try {
                        uniqLinks.add(i.getAttribute("href"));
                    }
                    catch (err) {
                        break;
                    }
                }

                if (uniqLinksSize != uniqLinks.size) {
                    done = true;
                }

            }

            timer = Date.now() - timer;


            if (uniqLinksSize === uniqLinks.size && done === true) {

                parseOk++;

                console.log(colors.blue(currentURL));
                console.log(colors.green("#" + parseOk + " page parsed. Unique links:") + uniqLinksSize + "   time to parse:".green + timer + "ms", "next page:" + (parseOk + 1));
            
                done = false;


                player.play({
                    path: './sound/scan_done.wav',
                  }).then(() => {  
                  }).catch((error) => {
                    console.error(error);
                  });


            };

        };



        arrLinks = [...uniqLinks];
        text = arrLinks.join("\n");
        let date = dateformat(Date.now(), "yyyy-mm-dd'T'HH:MM:ss");

        fs.writeFile("./link_list/" + date + '.txt', text, (err) => {

            if (err) throw err;
            console.log(colors.red('Report: '), colors.green('links saved!'));
            console.log("CONGRATULATIONS !!!".rainbow);
            player.play({
                path: './sound/scan_stop.wav',
              }).then(() => {  
              }).catch((error) => {
                console.error(error);
              });
    
        });

    });

});