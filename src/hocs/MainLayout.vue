<template>
    <div>
        <div>
            <nav class="d-flex align-items-center flex-column">
                <div>
                    <img class="avata" src="https://chiase24.com/wp-content/uploads/2020/02/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-avatar-h%C3%A0i-h%C6%B0%E1%BB%9Bc-nh%C3%ACn-l%C3%A0-b%E1%BA%ADt-c%C6%B0%E1%BB%9Di-1.jpg" alt="">
                </div>
                <p>Lê Minh Cường</p>
                <ul class="menu">
                    <li class="menu-item active">tổng quan</li>
                    <li class="menu-item">bài hát</li>
                    <li class="menu-item">playlist</li>
                    <li class="menu-item">nghệ sĩ</li>
                    <li class="menu-item">album</li>
                    <li class="menu-item">mv</li>
                    <li class="menu-item">tải lên</li>
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
        width: 800px;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .menu-item {
        text-transform: uppercase;
        padding: 6px 16px;
        /* background-color: #1565c0; */
        border-radius: 25px;
        cursor: pointer;
        transition: 0.5s;
    }

    .menu-item:hover {
        background-color: #003c8f;
    }

    .menu-item.active {
        background-color: #003c8f;
    }

    .avata {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .wrap-container {
        min-height: 70vh;
    }
</style>