<template>
  <div class="antialiased">
    <ModernNav />

    <main class="main-content mx-auto ml-56px">
      <slot>
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-header>
              <slot name="main-header" />
            </template>

            <template #main-header-after>
              <slot name="main-header-after" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #main-content>
              <slot name="main-content" />
            </template>
            <template #main-content-after>
              <slot name="main-content-after" />
            </template>
            <template #main-nav-before>
              <slot name="main-nav-before" />
            </template>
            <template #main-nav-after>
              <slot name="main-nav-after" />
            </template>
            <template #aside-custom>
              <slot name="aside-custom" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </component>
        </RouterView>
      </slot>
    </main>

    <ModernFooter class="ml-16">
      <slot name="footer" />
    </ModernFooter>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding-top: 3.5rem;
  }

  .ml-16 {
    margin-left: 0;
  }
}
</style>
