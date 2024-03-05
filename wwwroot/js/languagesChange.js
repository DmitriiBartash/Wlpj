let selectedLanguage = "Ru";
let currentLanguage = "Ru";

const ruElement = document.querySelector('#myRadio3');
ruElement.checked = true;

const validationModelJson = {
    "text": {
        "accepted": {
            "Ru": "Принято!",
            "Eng": "Accepted!",
            "Ro": "Acceptat!"
        },
        "errors": {
            "name": {
                "Ru": "Пожалуйста введите Имя и Фамилию!",
                "Eng": "Please enter your first and last name!",
                "Ro": "Vă rugăm să introduceți numele și prenumele dvs!"
            },
            "phone": {
                "Ru": "Пожалуйста введите Номер Телефона!",
                "Eng": "Please enter your Phone Number!",
                "Ro": "Vă rugăm să introduceți numărul dvs. de telefon!"
            },
            "name_format": {
                "Ru": "Должно быть только 2 слова в первом поле!",
                "Eng": "There should be only 2 words in the first field!",
                "Ro": "În primul câmp ar trebui să existe doar 2 cuvinte!"
            },
            "few_digits": {
                "Ru": "Слишком мало цифр!",
                "Eng": "Too few digits!",
                "Ro": "Prea puține numere!"
            },
            "many_digits": {
                "Ru": "Слишком много цифр!",
                "Eng": "Too many digits!",
                "Ro": "Prea multe numere!"
            },
            "patternName":
            {
                "Ru": "Первое поле не соответствует шаблону",
                "Eng": "The first field does not match the pattern",
                "Ro": "Primul câmp nu se potrivește cu modelul"
            },
            "patternPhone":
            {
                "Ru": "Второе поле не соответствует шаблону",
                "Eng": "The second field does not match the pattern",
                "Ro": "Al doilea câmp nu se potrivește cu modelul"
            },
            "requests":
            {
                "Ru": "Слишком много запросов!",
                "Eng": "Too many requests!",
                "Ro": "Prea multe cereri"
            }
        }
    }
}


const languageModelJson = {
    "Ru": [
        {
            "nav-links": [
                "Главная",
                "Горящие предложения",
                "О нас",
                "Заявка",
                "Отзывы",
                "Контакты"
            ]
        },
        {
            "mainpage-text": [
                "Давайте",
                "Подарим <span>вам</span><br>Незабываемые путешествия",
                "Готовы начать своё следующее приключение? <br> Обратитесь к нам, и дайте нам сделать вашу мечту о путешествии реальностью"
            ],
            "button-know": "Узнать"
        },
        {
            "hot-deals-container": "Горящие предложения"
        },
        {
            "heading_about_us": "<h1>Что мы предлагаем?</h1>",
            "information-cards": [
                {
                    "title": "Персонализированный Подход",
                    "information_cards_text": "Мы стремимся осуществить желания каждого клиента Emirat Travel создает индивидуальные туры, адаптированные под уровень комфорта, интересы и бюджет каждого путешественника"
                },
                {
                    "title": "Личные Встречи и Консультации",
                    "information_cards_text": "Возможность встретиться с клиентами лично для обсуждения их путешествия и пожеланий"
                },
                {
                    "title": "Качественные Услуги",
                    "information_cards_text": "Обеспечение клиентов качественными услугами, включая профессиональных гидов, удобное размещение и транспорт. Всё для создания положительных воспоминаний!"
                }
            ]
        },
        {
            "about-us": {
                "heading_about_us": "<h1>Несколько фактов о нас</h1>",
                "years_count_text": "лет на рынке",
                "text_A_us1": "Мы заслужили репутацию надежного партнера среди тысяч путешественников.",
                "client_count_text": "счастливых клиентов",
                "text_A_us2": "Мы организовали тысячи удовлетворенных клиентов, которые оставляют нам положительные отзывы и рекомендации."
            }
        },
        {
            "call-header-text": "Хотите узнать поподробнее?",
            "inputbox-1": [
                "Имя и Фамилия",
                "Телефон"
            ],
            "inputbox-2": "Перезвоните мне"
        },
        {
            "TEXT":
            {
                "NAITI": "Где нас найти? <br><br>”Emirat Travel”<br>Str.ALbisoara 4, oficiu 611 <br> Moldova, Chisinau “Atrium” BC",
                "Grafik": "<br>График работы:<br><br>C 10: 00 - 19: 00, Понедельник-Суббота<br>C 8: 00 - 20: 00, по предварительной договорённости<br><br>Связь с нами: <br><br>+373 601 44 445<br>+373 601 44 442<br>+373 621 57 575"
            }
        },
        {
            "footer": {
                "findUs": "Найди нас ➜",
                "phone_numberes": "Связь с нами: <br> 060 144 445 <br> 060 144 442"
            }
        },
        {
            "reviews": "Что о нас говорят?"
        },
        {
            "swiper-tagdescriptionText": "Цена включает:"
        },
        {
            "fromSVG": "От"
        }
    ],
    "Eng": [
        {
            "nav-links": [
                "Home page",
                "Hot offers",
                "About us",
                "Call request",
                "Reviews",
                "Contacts"
            ]
        },
        {
            "mainpage-text": [
                "Let's",
                "Give you <span>Unforgettable travels</span>",
                "Are you ready to start your next adventure? <br> Contact us and let us make your travel dream come true"
            ],
            "button-know": "Explore"
        },
        {
            "hot-deals-container": "Hot Offers"
        },
        {
            "heading_about_us": "<h1>What do we offer?</h1>",
            "information-cards": [
                {
                    "title": "Personalized approach",
                    "information_cards_text": "We strive to fulfill the wishes of every client. Emirat Travel creates personalized tours adapted to the comfort level, interests and budget of each traveler."
                },
                {
                    "title": "Personal meetings and consultations",
                    "information_cards_text": "Opportunity to meet clients personally to discuss their journey and wishes."
                },
                {
                    "title": "Quality services",
                    "information_cards_text": "Providing clients with quality services, including professional guides, convenient accommodation and transportation. Everything to create positive memories!"
                }
            ]
        },
        {
            "about-us": {
                "heading_about_us": "<h1>A few facts about us</h1>",
                "years_count_text": "years on the market",
                "text_A_us1": "We have earned a reputation as a reliable partner among thousands of travelers.",
                "client_count_text": "happy clients",
                "text_A_us2": "We have thousands of satisfied customers who leave us positive reviews and recommendations."
            }
        },
        {
            "call-header-text": "Want to know more?",
            "inputbox-1": [
                "Name and surname",
                "Telephone"
            ],
            "inputbox-2": "Call me"
        },
        {
            "TEXT": {
                "NAITI": "Where can you findUs? <br><br>”Emirat Travel”<br>Str.ALbisoara 4, oficiu 611 <br> Moldova, Chisinau “Atrium” BC",
                "Grafik": "<br>Schedule:<br><br>10:00 - 19:00, Monday-Saturday<br>8:00 - 20:00, by prior arrangement<br><br>Our contacts: <br><br>+373 601 44 445<br>+373 601 44 442<br>+373 621 57 575"
            }
        },
        {
            "footer": {
                "findUs": "findUs ➜",
                "phone_numberes": "Contact us: <br> 060 144 445 <br> 060 144 442"
            }
        },
        {
            "reviews": "What are we known for?"
        },
        {
            "swiper-tagdescriptionText": "Price includes:"
        },
        {
            "fromSVG": "From"
        }
    ],
    "Ro": [
        {
            "nav-links": [
                "Pagina principală",
                "Oferte Fierbinți",
                "Despre noi",
                "Aplicarea",
                "Recenzii",
                "Contacte"
            ]
        },
        {
            "mainpage-text": [
                "Haideți",
                "Să-vă dăruim <span>Călătorii de neuitat</span>",
                "Sunteți gata să începeți următoarea aventură? <br> Contactați-ne și permiteți-ne să vă îndeplinim visul de călătorie"
            ],
            "button-know": "Află"
        },
        {
            "hot-deals-container": "Oferte Fierbinți"
        },
        {
            "heading_about_us": "<h1>Ce noi oferim?</h1>",
            "information-cards": [
                {
                    "title": "Abordare personală",
                    "information_cards_text": "Ne străduim să înțelegem nevoile și așteptările fiecărui client. Emirat Travel creează tururi personalizate în funcție de nivelul de confort, interesele și bugetul fiecărui călător"
                },
                {
                    "title": "Întâlniri și consultări personale",
                    "information_cards_text": "Posibilitatea de a vă întâlni personal cu un agent pentru a discuta despre călătorie și dorințele personale."
                },
                {
                    "title": "Servicii excelente",
                    "information_cards_text": "Ghizi profesioniști, cazare convenabilă, transport și alte servicii de calitate îmbogățesc experiența călătorului și lasă amintiri frumoase"
                }
            ]
        },
        {
            "about-us": {
                "heading_about_us": "<h1>Experiența noastră</h1>",
                "years_count_text": "ani de activitate",
                "text_A_us1": "Mii de călători au făcut din noi partenerul lor de încredere.",
                "client_count_text": "de clienți mulțumiți",
                "text_A_us2": "Mii de clienți mulțumiți au lăsat recenzii și recomandări pozitive."
            }
        },
        {
            "call-header-text": "Doriți să aflați mai multe?",
            "inputbox-1": [
                "Numele și prenumele",
                "Telefon"
            ],
            "inputbox-2": "Sună-mă înapoi"
        },
        {
            "TEXT": {
                "NAITI": "Unde ne găsiți? <br><br>”Emirat Travel”<br>Str.ALbisoara 4, oficiu 611 <br> Moldova, Chisinau “Atrium” BC",
                "Grafik": " <br>Orar:<br><br>De la 10:00 la 19:00, Luni-Sâmbătă<br>De la 8:00 - 20:00, cu programare prealabilă<br><br>Сontactele noastre<br><br>+373 601 44 445<br>+373 601 44 442<br>+373 621 57 575"
            }
        },
        {
            "footer": {
                "findUs": "Găsiți-ne ➜",
                "phone_numberes": "Contactează-ne: <br> 060 144 445 <br> 060 144 442"
            }
        },
        {
            "reviews": "Ce spun despre noi?"
        },
        {
            "swiper-tagdescriptionText": "Prețul include:"
        },
        {
            "fromSVG": "De la"
        }
    ]
}

function changeLanguage(element) {
    selectedLanguage = element.textContent;

    if (selectedLanguage != currentLanguage) {

        // NAV-LINKS
        let navLinksDiv = document.getElementsByClassName("nav-links")[0];
        let navLinksChildren = navLinksDiv.children;

        for (let i = 0; i < languageModelJson[selectedLanguage][0]["nav-links"].length; i++) {
            navLinksChildren[i].children[0].innerHTML = languageModelJson[selectedLanguage][0]["nav-links"][i];
        }

        // MAINPAGE
        let mainpageTextDiv = document.getElementsByClassName("mainpage-text")[0];
        let mainpageTextChildren = mainpageTextDiv.children;

        mainpageTextChildren[0].innerHTML = languageModelJson[selectedLanguage][1]["mainpage-text"][0];
        mainpageTextChildren[1].innerHTML = languageModelJson[selectedLanguage][1]["mainpage-text"][1];
        mainpageTextChildren[2].innerHTML = languageModelJson[selectedLanguage][1]["mainpage-text"][2];

        document.getElementsByClassName("button-know")[0].innerHTML = `<span>${languageModelJson[selectedLanguage][1]["button-know"]}</span>`;

        // HOT DEALS
        //let hotDealsDiv = document.getElementsByClassName("hot-deals-container")[0];
        let hotDealsDiv = document.querySelector("#hot_deals_h2");
        hotDealsDiv.innerHTML = languageModelJson[selectedLanguage][2]["hot-deals-container"];

        // ABOUT US
        document.getElementsByClassName("heading_about_us")[0].innerHTML = languageModelJson[selectedLanguage][3]["heading_about_us"];

        let informationCardsDiv = document.getElementsByClassName("Information_cards")[0];
        for (let i = 0; i < 3; i++) {
            informationCardsDiv.children[i].children[1].innerHTML = `<br> ${languageModelJson[selectedLanguage][3]["information-cards"][i]["title"]}`;
            informationCardsDiv.children[i].children[3].innerHTML = languageModelJson[selectedLanguage][3]["information-cards"][i]["information_cards_text"];
        }

        // price includes...
        //console.log(document.querySelector(".swiper-tagdescription p"));
        //document.querySelector(".tags").children[0].innerHTML = languageModelJson[selectedLanguage][9]["swiper-tagdescriptionText"];
        ////document.querySelector(".swiper-tagdescription p").innerHTML = languageModelJson[selectedLanguage][9]["swiper-tagdescriptionText"];

        // SVG FROM
        document.querySelector('#tspan8024').textContent = languageModelJson[selectedLanguage][10]["fromSVG"];

        // FACTS
        document.getElementsByClassName("heading_about_us")[1].innerHTML = languageModelJson[selectedLanguage][4]["about-us"]["heading_about_us"];

        document.getElementsByClassName("text_counter")[0].innerHTML = languageModelJson[selectedLanguage][4]["about-us"]["years_count_text"];
        document.getElementsByClassName("text_A_us")[0].innerHTML = `<br> ${languageModelJson[selectedLanguage][4]["about-us"]["text_A_us1"]}`;
        document.getElementsByClassName("text_counter")[1].innerHTML = languageModelJson[selectedLanguage][4]["about-us"]["client_count_text"];
        document.getElementsByClassName("text_A_us")[1].innerHTML = `<br> ${languageModelJson[selectedLanguage][4]["about-us"]["text_A_us2"]}`;

        // TESTIMONIALS
        document.querySelector('.testimonials-heading').innerHTML = languageModelJson[selectedLanguage][8]["reviews"];

        // CALL US 
        document.getElementsByClassName("call-header-text")[0].children[0].innerHTML = languageModelJson[selectedLanguage][5]["call-header-text"];
        document.getElementsByClassName("inputbox-1")[0].children[1].innerHTML = languageModelJson[selectedLanguage][5]["inputbox-1"][0];
        document.getElementsByClassName("inputbox-1")[1].children[1].innerHTML = languageModelJson[selectedLanguage][5]["inputbox-1"][1];
        document.getElementsByClassName("inputbox-2")[0].children[0].innerHTML = `<span>${languageModelJson[selectedLanguage][5]["inputbox-2"]}</span>`;

        // MAP
        document.getElementsByClassName("NAITI")[0].innerHTML = languageModelJson[selectedLanguage][6]["TEXT"]["NAITI"];
        document.getElementsByClassName("Grafik")[0].innerHTML = languageModelJson[selectedLanguage][6]["TEXT"]["Grafik"];

        // FOOTER 
        document.querySelector(".social_network p").innerHTML = languageModelJson[selectedLanguage][7]["footer"]["findUs"];
        document.getElementsByClassName("phone_numberes")[0].innerHTML = languageModelJson[selectedLanguage][7]["footer"]["phone_numberes"];

        //document.querySelector(".testimonials-heading").innerHTML = languageModelJson[selectedLanguage][8]["reviews"];


        //SelectCountry(document.querySelector(`#selectedCountry`));

        // VALIDATION MSG
        let validDiv = document.querySelector(".inputInformation");
        if (validDiv.children.length > 0) {
            console.log(validDiv.children);

            // first get all keys
            let parentKeys = Object.keys(validationModelJson.text.errors);

            // if it's not accepted
            let errorsDiv = document.querySelectorAll(".inputInformation_error");
            let successDiv = document.querySelector(".inputInformation_success");
            if (errorsDiv.length > 0) {
                console.log("ERRORS");
                for (let errorDiv of errorsDiv) {
                    for (let errorType of parentKeys) {
                        let childKeys = Object.keys(validationModelJson.text.errors[errorType]);

                        for (let languageVersion of childKeys) {
                            if (validationModelJson.text.errors[errorType][languageVersion] == errorsDiv[0].textContent) {
                                errorDiv.textContent = validationModelJson.text.errors[errorType][selectedLanguage];
                                break;
                            }
                        }
                    }
                }
            }
            else if (successDiv != null) {
                console.log("NO ERRORS");
                for (let languageVersion of Object.keys(validationModelJson.text.accepted)) {
                    if (validationModelJson.text.accepted[languageVersion] == successDiv.textContent) {
                        successDiv.textContent = validationModelJson.text.accepted[selectedLanguage];
                        break;
                    }
                }
            }

            // if it's accepted
        }

        let dataJSON = {
            "countryID": document.querySelector(`#selectedCountry`).textContent,
            "selectedLanguage": selectedLanguage
        }

        $.ajax({
            url: '/Home/LoadSwiper',
            type: 'POST',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json',
            success: function (result) {
                $('.hot-deals-container').html(result);
                isFirstStart = false;
                hookSlicks();
            }
        });

        SelectCountry(document.querySelector(`#selectedCountry`).textContent);
    }
    currentLanguage = selectedLanguage;
}