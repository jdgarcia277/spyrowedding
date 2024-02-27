<script lang="ts">

</script>
<div class="login_page_container">
    <div class="login_container">
        <div class="login_image_container">
            <img src="/images/desktop/upclose-ring-square.webp" alt="Hannah showing off ring">
        </div>
        <div class="login_info_container">
            <h3 class="font_med_large">Login:</h3>
            <form action="">
                <label for="username" class="font_small_med">Username:</label>
                <input type="text" name="username" id="username">
                <br>
                <br>
                <label for="password" class="font_small_med">Password</label>
                <input type="password" name="password" id="password">
            </form>
        </div>
    </div>
</div>


<style>
    .login_page_container {
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: minmax(300px, 900px);
        grid-template-rows: minmax(300px, 900px);
        justify-content: center;
        align-items: center;
    }
    .login_container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 75px;
        background: linear-gradient(to right, #384b36 0%, #50694f 100%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        padding: 75px;
        border-radius: 25px;
    }
    .login_image_container img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }
    .login_info_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 50px;
    }
    @media (prefers-color-scheme: light) {
        .login_page_container {
            background-color: var(--color_dark);
            color: var(--color_white);
        }
    }
</style>