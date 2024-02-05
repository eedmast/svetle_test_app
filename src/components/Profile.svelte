<script>
  export let userData;
</script>

<style>
  .profile-style {
      position: relative;
      display: inline-block;
      top: 12rem;
      min-width: 20rem;
      text-align:center;
      background-image: linear-gradient(
              to right,
              rgba(120, 120, 120, 0.8),
              rgba(220, 220, 220, 0.8));
      box-shadow: 0 .5rem 1.2rem rgba(0,0,0, .4);
      border-radius: 7px;
      border-color: black;
      padding: .7rem;
      color: #000;
  }
</style>

<div class="profile-style">
  <h3>{userData.telegramId}</h3>
  <h3>***************</h3>
  <h3>Created: {userData.createdAt}</h3>
</div>