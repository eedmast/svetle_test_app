<script>
    import {onMount, onDestroy} from 'svelte';
    import userStore from './user_store'
    import {formatCurrentTime, generateToken} from "./utils/utils";
    import {fetchUserData, sendCreateUserRequest, sendDeleteUserRequest} from "./utils/serverUtils";
    import SignupForm from "./components/SignupForm.svelte";
    import Profile from "./components/Profile.svelte";

    let dataInitComplete = false;
    let isDialogOpen = true;
    let toShowToken = false;
    let userCreated = false;

    let userLoggedIn = false;

    let dialogType = 'signup';
    let userData;
    //TODO: implement error handling
    let errorMessage;

    $: dialogType = userCreated ? 'login' : 'signup'
    $: menuButtonCaption = userCreated ? (userLoggedIn ? 'Profile' : 'Login') : 'Signup'

    onMount( ()=> {
        fetchUserData().then(
            (result) => {
                userStore.set(result);
                dataInitComplete = true;
            },
            (error) => {
                errorMessage = error.message;
            });
    })

    const unsub = userStore.subscribe( data => {
        userData = {
            id: data?.id,
            telegramId: data?.telegramId,
            password: data?.password,
            token: data?.token,
            createdAt: data?.createdAt
        }
        userCreated = !!data?.id;
    });

    function showDialog(event) {
        isDialogOpen = true;
    }

    function handleUserSignup(event) {
        const newUserData = {
            id: 1,
            telegramId: event.detail.telegramId,
            password: event.detail.password,
            token: generateToken(),
            createdAt: formatCurrentTime()
        }

        sendCreateUserRequest(newUserData).then(
            (result) => {
                userStore.set(result);
                toShowToken = true;
            },
            (error) => {
                errorMessage = error;
            }
        );
    }

    function handleUserLogin(event) {
        fetchUserData();
        if (checkLoginData(event.detail)) {
            userLoggedIn = true;
        }

    }

    function checkLoginData(loginData) {
        //TODO: provide user more information in case of wrong credentials
        let isDataValid = true;
        for (const [key, value] of Object.entries(loginData)) {
            console.log(`${key}: ${value}`);
            if(value != userData[key]) {
                isDataValid = false;
            }
        }
        return isDataValid;
    }

    function handleTokenShow(e) {
        toShowToken = e.detail;
    }

  onDestroy(() => {
      if(unsub) {
          unsub();
      }
  })

</script>

<style>
    .header-style {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 5rem;
        padding-left: 2rem;
        background-color: #0088cc;
        padding-top: 0;
        padding-bottom: 0;
        text-align: left;
    }
    .header-text {
      position: absolute;
      margin-top: 0.9rem;
      cursor: pointer;
      user-select: none;
    }

    main {
        width: 100vw;
        height: 100vh;
        text-align: center;
    }

    .temp {
        position: absolute;
        color: black;
        top: 10rem;
        left: 1rem;
    }

</style>

<main on:mousedown={ () => isDialogOpen = false || toShowToken}>
  <header class="header-style">
    <a class="header-text" on:click|stopPropagation={showDialog} >{dataInitComplete ? menuButtonCaption : ''}</a>
  </header>

  {#if userLoggedIn}
    <Profile userData={userData}/>
  {:else if isDialogOpen}
    <SignupForm action={dialogType} showToken={toShowToken} token={userData.token}
                on:signupRequest={handleUserSignup}
                on:loginRequest={handleUserLogin}
                on:tokenShow={handleTokenShow}
    />
  {/if}
</main>