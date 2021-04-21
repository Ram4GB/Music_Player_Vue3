<template>
    <div>
        <div>
            <nav class="d-flex align-items-center flex-column">
                <div>
                    <img class="avata" src="https://chiase24.com/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-h%C3%A0i-h%C6%B0%E1%BB%9Bc-nh%C3%ACn-l%C3%A0-b%E1%BA%ADt-c%C6%B0%E1%BB%9Di-1.jpg" alt="">
                </div>
                <p>Lê Minh Cường</p>
                <ul class="menu">
                    <li class="menu-item active">
                        <router-link to="/">Trang chủ</router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/news">News</router-link>
                    </li>
                </ul>
            </nav>
            <div class="container-fluid p-2 wrap-container">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    nav {
        background: #5e92f3;
        color: #fff;
        padding: 15px 0px 5px 0px;
        text-align: center;
        height: 22vh;
    }
    
    .menu {
        display: flex;
        list-style: none;
        justify-content: space-around;
        width: 400px;
        margin-bottom: 0;
        padding-bottom: 0;
        padding-left: 0;
        margin-left: 0;
    }

    .menu-item a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        padding: 6px 16px;
        border-radius: 25px;
        cursor: pointer;
        transition: 0.5s;
        display: block;
        width: 150px;
        text-align: center;
        border: 1px solid #fff
    }

    .menu-item:hover a {
        background-color: #003c8f;
    }

    .menu-item.active a {
        background-color: #003c8f;
    }

    .avata {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: auto;
        display: block;
    }

    .wrap-container {
        min-height: 70vh;
    }
</style>