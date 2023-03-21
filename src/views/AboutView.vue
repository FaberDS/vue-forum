<script setup>
import { VueCollapsiblePanelGroup, VueCollapsiblePanel } from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'

const onewayBinding = `
<script setup>
  const name = ref<string>('')
<\/script>

<template>
  <p>
    {{ name }}
  </p>
</template>
`
const twowayBinding = `
<script setup>
  const name = ref<string>('')
<\/script>

<template>
<input
        v-model="name"
        name="name"
      />
</template>
`
</script>

<template>
  <div class="about">
    <h1>About MVVM in vue</h1>
    <hr />
    <div class="content">
      <!-- Seperation of concern-->
      <div class="part">
        <vue-collapsible-panel-group>
          <vue-collapsible-panel :expanded="false">
            <template #title>Seperation of concern </template>
            <template #content>
              <ul>
                <li>👍 view | component hierarchy</li>
                <li>👍 store used as model</li>
                <li>
                  👎 SFC - Single File Component. BUT
                  <span class="highlight">separation of concerns</span> is not equal to the
                  <span class="highlight">separation of file types</span>!
                </li>
              </ul>
            </template>
          </vue-collapsible-panel>
        </vue-collapsible-panel-group>
      </div>

      <!-- Data binding | One way binding-->
      <div class="part">
        <vue-collapsible-panel-group>
          <vue-collapsible-panel :expanded="false">
            <template #title>Data binding | One way binding</template>
            <template #content>
              <ul>
                Based on string interpolation &
                <span class="highlight">ref() function</span>
                which allow the oberservation of primitive values.
                <div class="code">
                  <xmp>
                    <code>
                    {{ onewayBinding }}
                  </code>
                </xmp>
                </div>
              </ul>
            </template>
          </vue-collapsible-panel>
        </vue-collapsible-panel-group>
      </div>
    </div>

    <!-- Data binding | Two way binding-->
    <div class="part">
      <vue-collapsible-panel-group>
        <vue-collapsible-panel :expanded="false">
          <template #title>Data binding | Two way binding</template>
          <template #content>
            <ul>
              Based on the built in directive
              <span class="highlight">v-model</span>
              &
              <span class="highlight">ref() function</span>
              which allow the oberservation of primitive values.
              <div class="code">
                <xmp>
                <code>
                  {{ twowayBinding }}
                </code>
              </xmp>
              </div>
            </ul>
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>
    </div>
  </div>
</template>

<style scoped>
.content,
.part {
  margin-top: 16px;
}
ul li {
  list-style: none;
}
.code {
  font-family: Arial, Helvetica, sans-serif;
  color: darkgreen;
}
.highlight {
  font-weight: bold;
  font-style: italic;
  font-size: 110%;
}
</style>
