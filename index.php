<?php 
    session_start();
    function get_client_language($availableLanguages, $default='en'){
        if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
            $langs=explode(',',$_SERVER['HTTP_ACCEPT_LANGUAGE']);
    
            foreach ($langs as $value){
                $choice=substr($value,0,2);
                if(in_array($choice, $availableLanguages)){
                    return $choice;
                }
            }
        } 
        return $default;
    }
    $availableLanguages = ['pt', 'en'];
    
    if(!isset($_COOKIE['accept_cookie'])){
        setcookie('accept_cookie', md5(0),  time()+60*60*24*30, "/bom2", '', false); //localhost
        // setcookie('accept_cookie', md5(0),  time()+60*60*24*30, '/', '', true);
    }

    if(!isset($_GET['lang']))
        $LANG = get_client_language($availableLanguages, $default='en');
    elseif(isset($_GET['lang']) && $_GET['lang'] == 'pt')
        $LANG = 'pt';
    elseif(isset($_GET['lang']) && $_GET['lang'] == 'en')
        $LANG = 'en';

    require('./assets/lang/_'.$LANG.'.php');
    require_once('./models/db.php');
    require('./functions/place.php');
    require('./functions/product.php');

    $CONN = new Database();
    $allEvents = getAllPlaces($CONN->db);
    $allProducts = getAllProducts($CONN->db);

    $queryToken = $CONN->db->query('SELECT * FROM config');
    $fetchToken = $queryToken->fetch_assoc();
?> 
<!DOCTYPE html>
<html lang="<?php echo $LANG; ?>">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Bom&sup2;</title>
    <link rel="shortcut icon" type="image/x-icon" href="./assets/img/favicon16.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/brands.css" integrity="sha384-BCEeiNUiLzxxoeYaIu7jJqq0aVVz2O2Ig4WbWEmRQ2Dx/AAxNV1wMDBXyyrxw1Zd" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/fontawesome.css" integrity="sha384-HU5rcgG/yUrsDGWsVACclYdzdCcn5yU8V/3V84zSrPDHwZEdjykadlgI6RHrxGrJ" crossorigin="anonymous">
    <script>
        const instagramToken =  '<?php echo $fetchToken['ig_access_token']; ?>';
        const events = [
            <?php 
                for($i = 0; $i < sizeof($allEvents); $i++){
                    echo "{
                        title: \"".$allEvents[$i]['name']['placePT']."\",
                        start: \"".$allEvents[$i]['duration']['startDate']."\",
                        end: \"".$allEvents[$i]['duration']['endDate']."\",
                        url: \"https://www.google.com/maps/dir/?api=1&destination=".$allEvents[$i]['gps']['latitude'].",".$allEvents[$i]['gps']['longitude']."\"
                    },";
                }    
            ?>
        ];
        const calenderConfig = {
            locale: '<?php echo $LANG; ?>',
            today: '<?php echo (($LANG == 'en') ? 'today':'hoje'); ?>'
        };
        const sendMessageResp = {
            success: '<?php echo $langArray['contacts']['contactForm']['messageSentSuccess']; ?>',
            fail: '<?php echo $langArray['contacts']['contactForm']['messageSentFail']; ?>'
        }
    </script>
<link href="assets/css/vendors~index.css?818e20abaae123fdbd40" rel="stylesheet"><link href="assets/css/index.css?818e20abaae123fdbd40" rel="stylesheet"></head>
<body>
    <?php //print("<pre>".json_encode($allEvents,true)."</pre>");?>
    <?php 
        if(!isset($_COOKIE['accept_cookie']) || (isset($_COOKIE['accept_cookie']) && $_COOKIE['accept_cookie'] == md5(0))){
            include('_include/cookie-prompt.php');
        }
    ?>
    <nav class="main-nav card-background-dark" role="navigation">
        <div class="btn nav-toggle">
            <span class="nav-close-icon"><i class="custom-i arrow-right"></i></span>
        </div>
        <div class="logo-container-outer">
            <img src="assets/img/logo.png" class="nav-mobile-logo" alt="">
        </div>
        <div class="scroll-home-btn">
            <a data-link="homepage" class="btn btn-nav"><?php echo $langArray['nav']['home']; ?></a>
        </div>
        <div>
            <a data-link="concept" class="btn btn-nav"><?php echo $langArray['nav']['concept']; ?></a>
        </div>
        <div>
            <a data-link="products" class="btn btn-nav"><?php echo $langArray['nav']['products']; ?></a>
        </div>
        <div>
            <a data-link="story" class="btn btn-nav"><?php echo $langArray['nav']['background']; ?></a>
        </div>
        <div>
            <a data-link="hashtag" class="btn btn-nav"><?php echo $langArray['nav']['hashtag']; ?></a>
        </div>
        <div>
            <a data-link="events" class="btn btn-nav"><?php echo $langArray['nav']['events']; ?></a>
        </div>
        <div>
            <a data-link="contacts" class="btn btn-nav"><?php echo $langArray['nav']['contacts']; ?></a>
        </div>
        <div class="nav-contact-info">
            <!-- <div> -->
                <a href="tel:+351965838259" target="_top">+351 965 838 259</a>
                <a href="tel:+351968167446" target="_top">+351 968 167 446</a>
            <!-- </div>
            <div> -->
                <a href="mailto:info@bomaoquadrado.pt" target="_top">info@bomaoquadrado.pt</a>
            <!-- </div> -->
        </div>
    </nav>
    <main class="parallax-wrapper">
        <header class="main-header">
            <div class="roadmap">
                <div class="road-map-locator">
                    <div id="calendar"></div>
                </div>
                <div class="calendar-language-delimiter">
                    <a id="show-locator" href="#" class="btn" style="align-self: end;"><?php echo $langArray['calender']['showBtn1']; ?> <span style="text-decoration: underline"><?php echo $langArray['calender']['showBtn2']; ?></span></a>
                    <select class="custom-select" id="lang-selector">
                        <option value="pt" <?php echo ($LANG == 'pt' ? 'selected':''); ?> >PT</option>
                        <option value="en" <?php echo ($LANG == 'en' ? 'selected':'');  ?> >EN</option>
                    </select>
                </div>
            </div>
            <div class="top-stripe"></div>
            <img src="assets/img/logo.png" class="logo-landing-page" alt="">
            <div class="btn nav-toggle" id="main-toggle-button">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </header>
        <section class="section parallax bg1 justify-content-center" id="homepage">
            <div>
                <h1><?php echo $langArray['landingText']['mainHeader']; ?></h1>
                <h3><?php echo $langArray['landingText']['underHeader']; ?></h3>
                <p><?php echo $langArray['landingText']['checkProductStart']; ?> <u id="scroll-to-products"><?php echo $langArray['landingText']['checkProductsBtn']; ?></u> <?php echo $langArray['landingText']['checkProductsEnd']; ?></p>
            </div>
        </section>
        <!-- Conceito -->
        <section class="section static card-background-light" id="concept">
            <h1><?php echo $langArray['concept']['title']; ?></h1>
            <div>
                <?php echo $langArray['concept']['description']; ?>
            </div>
        </section>
        <section class="section parallax bg2">
        </section>
        <!-- Produtos -->
        <section class="section static card-background-dark" id="products">
            <h1><?php echo $langArray['productsTitle']; ?></h1>
            <div style="text-align: center; padding: 1em;">
                <img src="assets/img/menu.jpg" />
            </div>
        </section>
        <section class="section parallax bg3">
        </section>
        <!-- História -->
        <section class="section static card-background-light" id="story">
            <h1><?php echo $langArray['background']['title']; ?></h1>
            <div>
                <?php echo $langArray['background']['description']; ?>
            </div>
        </section>
        <section class="section parallax bg4">
            
        </section>
        <!-- #bomaoquadrado -->
        <section class="section static card-background-dark" id="hashtag">
                <h1><?php echo $langArray['hashtag']['title']; ?></h1>
                <div>
                    <?php echo $langArray['hashtag']['description']; ?> 
                    <div id="instafeed"></div>
                </div>
        </section>
        <section class="section parallax bg5">
        </section>
        <!-- Eventos -->
        <section class="section static card-background-light" id="events">
            <h1><?php echo $langArray['events']['title']; ?></h1>
            <div>
                <?php echo $langArray['events']['description']; ?>                       
            </div>
        </section>
        <section class="section parallax bg6">
        </section>
        <!-- Contactos -->
        <section class="section static card-background-dark" id="contacts">
            <h1><?php echo $langArray['contacts']['title']; ?></h1>
            <div class="contact-wrapper">
                <div class="contact-text">
                    <?php echo $langArray['contacts']['description']; ?>   
                </div>
                <div class="contact-form-wrapper">
                        <div id="error-message" class="hide" style="color: rgb(178, 34, 34);"><?php echo $langArray['contacts']['contactForm']['fillAllFieldsMsg']; ?></div>
                        <form id="contact-form" class="contact-form">                   
                            <!-- <label for="form-name">Nome</label> -->
                            <input name="form-name" type="text" class="form-input" placeholder="<?php echo $langArray['contacts']['contactForm']['name']; ?>">
                            <!-- <label for="form-email">E-mail</label> -->
                            <input name="form-email" type="email "class="form-input" placeholder="<?php echo $langArray['contacts']['contactForm']['email']; ?>">
                            <!-- <label for="">Motivo de contacto</label> -->
                            <select name="form-select" class="form-input">
                            <option value="0" selected disabled><?php echo $langArray['contacts']['contactForm']['contactSelect']['default']; ?></option>
                            <option value="1"><?php echo $langArray['contacts']['contactForm']['contactSelect']['info']; ?></option>
                            <option value="2"><?php echo $langArray['contacts']['contactForm']['contactSelect']['feedback']; ?></option>
                            <option value="3"><?php echo $langArray['contacts']['contactForm']['contactSelect']['event']; ?></option>
                        </select>
                        <!-- <label for="">Mensagem</label> -->
                        <textarea name="form-message" class="form-input" cols="30" rows="10" placeholder="<?php echo $langArray['contacts']['contactForm']['messageArea']; ?>"></textarea>
                        <div style="display: grid; grid-template-columns: 1fr 1fr;">
                                <span>
                                    <label for="terms"><?php echo $langArray['contacts']['contactForm']['termsStart']; ?> <a href="#" style="text-decoration: underline !important"><?php echo $langArray['contacts']['contactForm']['termsLink']; ?></a></label>
                                    <input type="checkbox" name="terms" class="form-input" style="vertical-align: middle; margin: 0 !important; box-shadow: none;">
                                </span>
                            <div id="lds-ellipsis" class="hide"><div></div><div></div><div></div><div></div></div>
                            <div id="message-status" class="hide"></div>
                            <button type="submit" id="send-btn" class="btn btn-send"><?php echo $langArray['contacts']['contactForm']['sendBtn']; ?></button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <section class="section parallax bg7">
        </section>
        <footer class="section static footer">
            <div class="social-media-wrapper">
                <a href="#" class="fab fa-twitter-square"></a>
                <a href="https://www.facebook.com/bomaoquadrado/" class="fab fa-facebook-square" target="_blank"></a>
                <a href="https://www.instagram.com/bomaoquadrado/" class="fab fa-instagram" target="_blank"></a>
            </div>
            <div class="contact-information">
                <div>
                    <a href="tel:+351965838259 " target="_top">+351 965 838 259</a> / <a href="tel:+351968167446 " target="_top">+351 968 167 446</a>
                </div>
                <div>
                    <a href="mailto:info@bomaoquadrado.pt" target="_top">info@bomaoquadrado.pt</a>
                </div>
            </div>
            <div class="footer-surplus">
                <div>&copy; Bom<sup>2</sup> 2018</div>
                <div><?php echo $langArray['footerDevBy']; ?> <a href="https://se.linkedin.com/in/calexandru2018/en" target="_blank">Alexandru Cheltuitor</a></div>
            </div>
        </footer>
    </main>
    <button id="scroll-to-top" title="Ir para o topo">
        <i class="custom-i arrow-up"></i>
        <i class="custom-i arrow-up"></i>
    </button>
</button>
<script type="text/javascript" src="assets/js/vendors~index.js?818e20abaae123fdbd40"></script><script type="text/javascript" src="assets/js/index.js?818e20abaae123fdbd40"></script></body>
</html>