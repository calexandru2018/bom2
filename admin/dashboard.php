<?php 
    session_start();
    if(isset($_SESSION['admin_token']) && isset($_SESSION['csrf_token'])){
    require('./models/db.php');
    $CONN = new Database();
    // var_dump($_SESSION);
    $query = $CONN->db->query("select name from admin where adminID = '".$_SESSION['admin_token']."'");
    $resultAdmin = $query->fetch_object();
?>
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dashboard - Bom&sup2;</title>
    <link href="assets/css/vendors~index.css?818e20abaae123fdbd40" rel="stylesheet"><link href="assets/css/dashboard.css?818e20abaae123fdbd40" rel="stylesheet"></head>
    <body>
        <div id="settings-overlay">
            <div class="admin-settings">
                <button class="btn btn-primary self-center" id="show-admin-list">Adicionar Administrador</button>
                <form class="admin-add-new">
                    <label for="email">E-mail*</label>
                    <input type="email" name="email" data-category="admin-add-input">
                    <label for="password">Palavra Passe*</label>
                    <input type="passwird" name="pwd" data-category="admin-add-input">
                    <label for="name">Nome*</label>
                    <input type="text" name="name" data-category="admin-add-input">
                    <label for="phoneNumber">Telefone</label>
                    <input type="tel" name="phoneNumber" data-category="admin-add-input">
                    <div class="insert-btns">
                        <div></div>
                        <button class="btn-form-insert add-data" id="admin-add-input">Adicionar</button> 
                    </div>
                </form>
                <button class="btn btn-primary self-center" id="show-admin-list">Gerir Administradores</button>
                <div class="admin-list table-col-3">
                    <span class="table-header">Nome</span>
                    <span class="table-header">Telefone</span>
                    <span class="table-header">Accoes</span>
                    <span>David Simoes</span>
                    <span>123 456 789</span>
                    <span class="action-icons">
                        <a class="edit-form" data-category="admin" data-admin-id="1">
                            <img src="assets/img/edit.svg" alt="" srcset="">
                        </a>
                        <a class="delete-data" data-category="admin" data-admin-id="1">
                            <img src="assets/img/remove.svg" alt="" srcset="">
                        </a>
                    </span>
                    <span>Catarina Lourenço</span>
                    <span>987 654 321</span>
                    <span class="action-icons">
                            <a class="edit-form" data-category="admin" data-admin-id="2">
                                <img src="assets/img/edit.svg" alt="" srcset="">
                            </a>
                            <a class="delete-data" data-category="admin" data-admin-id="2">
                                <img src="assets/img/remove.svg" alt="" srcset="">
                            </a>
                        </span>
                </div>
                <button class="btn btn-primary self-center" id="show-admin-list">Alterar Password</button>
                <form class="change-password-form" style="display: none">
                    <label for="email">Passe Actual</label>
                    <input type="password" name="actualPassword" data-category="admin-edit-password">
                    <label for="name">Nova Passe*</label>
                    <input type="passwrod" name="newPassword" data-category="admin-edit-password">
                    <label for="name">Repita Passe*</label>
                    <input type="passwrod" name="rePassword" data-category="admin-edit-password">

                    <div class="insert-btns">
                        <div></div>
                        <button class="btn-form-insert add-data" id="admin-edit-password">Adicionar</button> 
                    </div>
                </form>
                <button class="btn btn-primary self-center" id="show-instagram-menu">Instagram</button>
                <form class="admin-add-new ig-access-form">
                    <div class="generate-token">
                        <a class="btn-form-insert self-center" href="https://www.instagram.com/oauth/authorize/?client_id=34e4dc127ef64f86b2e8a1f2708948aa&redirect_uri=https://www.bomaoquadrado.pt&response_type=token" onclick="window.open(this.href,'_blank')">
                            Novo
                        </a>
                        <input type="text" name="access_token" data-category="token-add-input" placeholder="Novo token">
                    </div>
                    <div class="insert-btns">
                        <div></div>
                        <button class="btn-form-insert add-data" id="token-add-input">Adicionar</button> 
                    </div>
                </form>
                <button class="show-settings btn-auto btn-primary self-center">
                    Voltar
                </button>
            </div>
        </div>
        <div id="edit-content"></div>
        <div class="page-wrapper">
            <div class="login" style="display: none"></div>
            <div class="dashboard">
                <div class="user-info columns-2-of-4">
                    <img class="self-center" src="assets/img/logo.png" alt="Imagem do administractor" srcset="">
                    <div class="user-options">
                        <button class="show-settings btn-auto btn-primary">
                            <img src="assets/img/settings.svg" alt="" srcset="">
                        </button>
                        <a href="./logout.php" class="btn-auto btn-primary" onclick="window.open(this.href,'_self')">
                            <img src="assets/img/logout.svg" alt="" srcset="">
                        </a>
                    </div>
                </div>
                <div class="user-name columns-2-of-4">
                    <h3>Bem vindo, <?php echo $resultAdmin->name; ?></h3>
                </div>
                <div class="places columns-4-of-4">
                    <button class="btn btn-primary self-center" id="places-menu-btn">Destinos</button>
                    <div class="sub-choice">
                    <button class="btn btn-secondary self-center" id="places-show-btn">Ver Destinos</button>
                        <div class="table-col-5">
                            <!-- <span class="table-header">ID</span> -->
                            <span class="table-header">Destino</span>
                            <span class="table-header">Desde</span>
                            <span class="table-header">Ate</span>
                            <span class="table-header">Mapa</span>
                            <span class="table-header">Accoes</span>
                            <!-- <span>1</span> -->
                            <span>Aljezur</span>
                            <span>2018-01-01</span>
                            <span>2018-12-31</span>
                            <span><a href="https://www.google.com/maps/dir/?api=1&destination=37.352141,-8.843425" onclick="window.open(this.href,'_blank')">Ver</a></span>
                            <span class="action-icons">
                                <a class="edit-form" data-category="place" data-place-id="1">
                                    <img src="assets/img/edit.svg" alt="" srcset="">
                                </a>
                                <a class="delete-data" data-category="place" data-place-id="1">
                                    <img src="assets/img/remove.svg" alt="" srcset="">
                                </a>
                            </span>
                            <!-- <span>2</span> -->
                            <span>Albufeira</span>
                            <span>2018-01-01</span>
                            <span>2018-12-31</span>
                            <span><a href="https://www.google.com/maps/dir/?api=1&destination=37.015578,-7.920545" onclick="window.open(this.href,'_blank')">Ver</a></span>
                            <span class="action-icons">
                                <a class="edit-form" data-category="place" data-place-id="2">
                                    <img src="assets/img/edit.svg" alt="" srcset="">
                                </a>
                                <a class="delete-data" data-category="place" data-place-id="2">
                                    <img src="assets/img/remove.svg" alt="" srcset="">
                                </a>
                            </span>
                        </div>
                        <button class="btn btn-secondary self-center" id="places-showform-btn">Novo</button>  
                        <form>
                            <label for="">Cidade</label>
                            <input type="text" name="name" data-category="place-add-input">
                            <label for="">Desde</label>
                            <input type="date" name="startDate" data-category="place-add-input">
                            <label for="">Ate</label>
                            <input type="date" name="endDate" data-category="place-add-input">
                            <label for="">Latitude</label>
                            <input type="text" name="latitude" data-category="place-add-input">
                            <label for="">Longitude</label>
                            <input type="text" name="longitude" data-category="place-add-input">

                            <div class="insert-btns_non-admin">
                                <div></div>
                                <button class="btn-form-insert add-data btn-col-right" id="place-add-input">Adicionar</button> 
                            </div>
                        </form>
                    </div>                         
                </div>
                <div class="flavours columns-4-of-4">
                    <button class="btn btn-primary self-center" id="flavours-menu-btn">Sabores</button>  
                    <div class="sub-choice">           
                        <button class="btn btn-secondary self-center" id="flavours-show-btn">Ver Sabores</button>
                        <div class="table-col-2">
                                <span class="table-header">Sabor</span>
                                <span class="table-header">Accoes</span>
                                <span>Morango</span>
                                <span class="action-icons">
                                    <a class="edit-form" data-category="flavour" data-flavour-id="1">
                                        <img src="assets/img/edit.svg" alt="" srcset="">
                                    </a>
                                    <a class="delete-data" data-category="flavour" data-flavour-id="1">
                                        <img src="assets/img/remove.svg" alt="" srcset="">
                                    </a>
                                </span>
                                <span>Chocolate</span>
                                <span class="action-icons">
                                    <a class="edit-form" data-category="flavour" data-flavour-id="2">
                                        <img src="assets/img/edit.svg" alt="" srcset="">
                                    </a>
                                    <a class="delete-data" data-category="flavour" data-flavour-id="2">
                                        <img src="assets/img/remove.svg" alt="" srcset="">
                                    </a>
                                </span>
                                <span>Nutella</span>
                                <span class="action-icons">
                                    <a class="edit-form" data-category="flavour" data-flavour-id="3">
                                        <img src="assets/img/edit.svg" alt="" srcset="">
                                    </a>
                                    <a class="delete-data" data-category="flavour" data-flavour-id="3">
                                        <img src="assets/img/remove.svg" alt="" srcset="">
                                    </a>
                                </span>
                        </div>                
                        <button class="btn btn-secondary self-center" id="flavours-showform-btn">Novo</button>
                        <form>
                            <label for="">Sabor em Portugues</label>
                            <input type="text" name="flavours_PT" data-category="flavours-add-input">
                            <label for="">Sabor em Ingles</label>
                            <input type="text" name="flavours_EN" data-category="flavours-add-input">
                            
                            <div class="insert-btns_non-admin">
                                <div> </div>
                                <button class="btn-form-insert add-data btn-col-right" id="flavours-add-input">Adicionar</button> 
                            </div>
                        </form>
                    </div>
                </div>
                <div class="products columns-4-of-4">
                    <button class="btn btn-primary self-center" id="products-menu-btn">Produtos</button>    
                    <div class="sub-choice">             
                        <button class="btn btn-secondary self-center" id="products-show-btn">Ver Produtos</button>   
                        <div class="table-col-2">
                            <span class="table-header">Produto</span>
                            <span class="table-header">Accoes</span>
                            <span>Crepes</span>
                            <span class="action-icons">
                                <a class="edit-form" data-category="product" data-product-id="1">
                                    <img src="assets/img/edit.svg" alt="" srcset="">
                                </a>
                                <a class="delete-data" data-category="product" data-product-id="1">
                                    <img src="assets/img/remove.svg" alt="" srcset="">
                                </a>
                            </span>
                            <span>Waffles</span>
                            <span class="action-icons">
                                <a class="edit-form"-data" data-category="product" data-product-id="2">
                                    <img src="assets/img/edit.svg" alt="" srcset="">
                                </a>
                                <a class="delete-data" data-category="product" data-product-id="2">
                                    <img src="assets/img/remove.svg" alt="" srcset="">
                                </a>
                            </span>
                        </div>             
                        <button class="btn btn-secondary self-center" id="product-showform-btn">Novo</button>
                        <form>
                            <label for="">Produto em Portugues</label>
                            <input type="text" name="product_PT" data-category="product-add-input">
                            <label for="">Produto em Ingles</label>
                            <input type="text" name="product_EN" data-category="product-add-input">
                            <label for="flavourList">Sabores</label>
                            <select name="flavour_1" data-category="product-add-input_1">
                                <option selected disabled>Selecione um sabor</option>
                                <option value="1">Nutella</option>
                                <option value="2">Chocolate</option>
                            </select>
                            <a class="add-new-flavour" style="width: fit-content; background-color: transparent; border: none; outline: none; color: #6495ed">Adicionar novo ?</a>

                            <div class="insert-btns_non-admin">
                                <div></div>
                                <button type="submit" class="btn-form-insert add-data btn-col-right" id="product-add-input">Adicionar</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <script type="text/javascript" src="assets/js/vendors~index.js?818e20abaae123fdbd40"></script><script type="text/javascript" src="assets/js/dashboard.js?818e20abaae123fdbd40"></script></body>
    </html>
<?php }?>