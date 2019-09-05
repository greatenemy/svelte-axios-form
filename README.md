svelte-axios-form
====================


[![npm](https://img.shields.io/npm/v/svelte-axios-form.svg)](https://www.npmjs.com/package/svelte-axios-form)

Demos:
- _None Yet_

## How to use

1. Install

    lodash@4 and axios are peer dependencies

    ```
    npm install --save-dev svelte-axios-form lodash@4 axios
    ```

2. Use in a svelte component:

    ```js
    <div>
      <form
        on:submit|preventDefault={login}
        on:keydown={($event) => form.onKeydown($event)}
      >
        <div class="form-group">
          <label>Username</label>
          <input
            class="form-control"
            bind:value={form.email}
            class:is-invalid={form.errors.has('email')}
            type='email'
            name='email'
          />
          <HasError {form} field="email" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            class="form-control"
            bind:value={form.password}
            class:is-invalid={form.errors.has('password')}
            type='password'
            name='password'
          />
          <HasError {form} field="password" />
        </div>

        <button
          disabled={form.busy}
          type="submit"
          class="btn btn-primary"
        >Log In</button>
      </form>
    </div>

    <script>
      import Form from 'svelte-axios-form'

      // or
      import { Form, HasError } from 'svelte-axios-form'

      // or
      import Form from 'svelte-axios-form/src/Form'

      import HasError from 'svelte-axios-form/src/components/HasError.svelte'
      import AlertError from 'svelte-axios-form/src/components/AlertError.svelte'
      import AlertErrors from 'svelte-axios-form/src/components/AlertErrors.svelte'
      import AlertSuccess from 'svelte-axios-form/src/components/AlertSuccess.svelte'

      let form = new Form({
        comment: ''
      })

      form.clear()
      form = form // note: you might need this line to trigger reactivity

      async function submit () {
        // clear errors
        form.clear()
        if (!form.comment) {
          form.errors.set('comment', 'Comment required')
        }
        if (form.errors.any()) {
          form = form // note: you might need this line to trigger reactivity
          return false
        }

        try {
          // send form to axios.post(/comments)
          // fill form.errors if errors returned
          // normal axios reponse
          const response = await form.post('comments')

          // handle success
          // goto('/home')
        } catch (err) {
          if (lodash.get(err, 'response.status') !== 422 && !form.errors.any()) {
            // we have an error that might not be a laravel validation error
            console.error(err)
          }
        } finally {
          form = form // note: you might need this line to trigger reactivity
        }
      }
    </script>
    ```

    if your axios instance was not used by default:

    ```js
    <script>
      import Form from 'svelte-axios-form'
      // if you have a special axios instance you need to use
      import client from './my-axios-client'

      // set specific client for this instanciation
      let form = new Form({
        comment: ''
        axios: client,
      })

      // or set global default
      Form.axios = client
    </script>
    ```

    ```js
    <script>
      import Errors from 'svelte-axios-form/src/Error'
      // if you want to use an ErrorBag directly
    ```


3. Further Notes:

* Your form can't contain any of these props: ['busy', 'successful', 'errors', 'originalData', 'axios']
* the css for the components assumes you're using Boostrap 4, but they are optional extras and you could easily convert them.
* this is a port of https://github.com/cretueusebiu/vform which was for a non-svelte front-end framework
