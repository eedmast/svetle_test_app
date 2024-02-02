<script>
  export let id;
  export let label;
  export let value = '';
  export let type = 'text';

</script>

<style>
    input,
    textarea {
        display: block;
        font: inherit;
        border-radius: 7px;
        background: white;
        /*padding: 0.15rem 0.25rem;*/
        transition: border-color 0.1s ease-out;
    }

    /*input::-webkit-outer-spin-button,*/
    /*input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none;*/
    /*    margin: 0;*/
    /*}*/

    input:focus,
    textarea:focus {
        border-color: #555;
        outline: none;
    }

    label {
        display: block;
        margin-bottom: 0.35rem;
        width: 100%;
        user-select: none;
    }

    .form-control {
        padding: 0.5rem 0;
        width: 100%;
        margin: 0.1rem 0;
    }

</style>

<div class="form-control" id="custom">
  <label for={id}>{label}</label>
  <input type={type} id={id} value={value} on:input/>
</div>

