<template>
  <v-footer class="px-0 pb-0 d-flex align-end" color="transparent">
    <v-container class="text-center footer-background mx-0">
      <v-row justify="center" style="font-size: 12px">
        <v-col cols="12" md="4" align-self="center">
          <div>
            <i18n-t
              keypath="footer.call_to_action.discord_phrase"
              scope="global"
            >
              <template #discord>
                <a
                  href="https://discord.gg/zeAP4Ng"
                  target="_blank"
                  class="info-link"
                >
                  <v-icon class="mr-1">mdi-discord</v-icon
                  >{{ $t("footer.call_to_action.discord") }}
                </a>
              </template>
            </i18n-t>
          </div>
          <div class="mt-1">
            <i18n-t
              keypath="footer.call_to_action.github_phrase"
              scope="global"
            >
              <template #github>
                <a
                  href="https://github.com/DysektAI/TarkovTracker"
                  target="_blank"
                  class="info-link"
                >
                  <v-icon class="mr-1">mdi-github</v-icon
                  >{{ $t("footer.call_to_action.github") }}
                </a>
              </template>
            </i18n-t>
          </div>
        </v-col>
      </v-row>
      <!-- Notice of Battlestate Games copy/trade notices -->
      <v-container class="text-center mb-0 pb-0" style="font-size: 12px">
        <div>
          Game content and materials are trademarks and copyrights of
          Battlestate Games and its licensors. All rights reserved.
        </div>
        <div class="mt-2">
          TarkovTracker &copy; 2020 - {{ new Date().getFullYear() }}
        </div>
        <div class="mt-0">
          <router-link to="/terms" target="_blank" class="info-link"
            >Terms</router-link
          >
          |
          <router-link to="/privacy" target="_blank" class="info-link"
            >Privacy</router-link
          >
        </div>
      </v-container>
    </v-container>
  </v-footer>
</template>

<script setup></script>
<style lang="scss" scoped>
.footer-background {
  background-color: rgba(0, 0, 0, 0.3);
  max-width: 100% !important;
}

a:link,
a:active,
a:visited {
  color: rgba(var(--v-theme-link), 1);
}

.info-link {
  text-decoration: none;
}

.custom-svg {
  height: 4em;
}
</style>
