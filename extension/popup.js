/**
 * Created by lil on 22.05.2017.
 */

var interval;

download_raw_id = function () {
    var adres = document.getElementById('adres')
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", adres.value, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {
            if (txtFile.status === 200) {
                allText = txtFile.responseText;
                lines = txtFile.responseText.split("\n");
                loop(lines)
            }
            
        }
    }
    txtFile.send(null);
}


send_r = function (eksi_id) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText, eksi_id);
        }
    });
    xhr.open("POST", "https://eksisozluk.com/userrelation/addrelation/" + eksi_id + "?r=i");
    xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(null);
    var yhr = new XMLHttpRequest();
    yhr.withCredentials = true;
    yhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText, eksi_id);
        }
    });
    yhr.open("POST", "https://eksisozluk.com/userrelation/addrelation/" + eksi_id + "?r=m");
    yhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
    yhr.setRequestHeader("cache-control", "no-cache");
    yhr.send(null);
}


loop = function (lines) {
    var counter = 0;
    var interval = setInterval(function(){
        if(counter > lines.lenght) {
            // when done
            clearInterval(interval);
            var sayi = document.getElementById('sayi')
            var blocked = document.getElementById('blocktext')
            sayi.style.color = 'green';
            blocked.style.color = 'green';
        }
        send_r(lines[counter])
        counter++;
        var sy = document.getElementById('sayi')
        sy.innerHTML = counter;
    }, 300);
}


document.addEventListener('DOMContentLoaded', function() {
    var button1 = document.getElementById('button1');
    button1.addEventListener('click', function() {
        // before start
        var button2 = document.getElementById('button2');
        var adres = document.getElementById('adres')

        var panel = document.getElementById('pnl')
        console.log(panel.style.display)
        button1.style.display = 'none'
        button2.style.display = 'block'
        panel.style.display = 'inline-flex'
        download_raw_id(loop)
        });

    button2.addEventListener('click', function() {
        // before start
        var panel = document.getElementById('pnl')
            console.log(panel.style.display)
            button1.style.display = 'block'
            button2.style.display = 'none'
            panel.style.display = 'inline-flex'
            clearInterval(interval)
        download_raw_id(loop)
        });
    });
