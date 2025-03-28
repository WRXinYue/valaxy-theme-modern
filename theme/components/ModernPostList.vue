<script setup lang="ts">
import type { Post } from 'valaxy'
import { usePostList } from 'valaxy'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const routes = usePostList({ type: props.type || '' })
const posts = computed(() => {
  const allPosts = props.posts || routes.value
  return allPosts.filter(post => post.path !== '/posts')
})

function formatDate(dateInput?: string | number | Date) {
  if (!dateInput)
    return ''

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${month}/${day}`
}

function shouldShowDate(index: number) {
  if (index === 0)
    return true
  const currentDate = formatDate(posts.value[index].date)
  const previousDate = formatDate(posts.value[index - 1].date)
  return currentDate !== previousDate
}

const containerRef = ref<HTMLElement | null>(null)
const itemsVisible = ref<boolean[]>([])

onMounted(() => {
  if (posts.value.length) {
    itemsVisible.value = Array.from<boolean>({ length: posts.value.length }).fill(false)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number.parseInt(entry.target.getAttribute('data-index') || '0')
        if (entry.isIntersecting) {
          setTimeout(() => {
            itemsVisible.value[index] = true
          }, index * 50)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px 100px 0px',
    })

    setTimeout(() => {
      document.querySelectorAll('.modern-post-item').forEach((el) => {
        observer.observe(el)
      })
    }, 0)
  }
})
</script>

<template>
  <div ref="containerRef" w="md:19.37vw" max-h-100vh overflow-y-auto class="modern-scroll-container">
    <div class="modern-safe-padding modern-post-list">
      <template v-for="(post, index) in posts" :key="post.path">
        <div v-if="shouldShowDate(index)" top="0" left="0" class="modern-post-list-header" sticky z-10>
          <div relative h="63px" w="md:15.5vw" ml-auto>
            <div absolute bottom="0" left="0">
              <div flex items-center text-xl font-bold class="modern-post-list-title">
                {{ formatDate(post.date) }}
              </div>
            </div>
          </div>
        </div>

        <div
          w="md:15.5vw"
          ml-auto
          class="modern-post-item"
          :class="{ 'item-visible': itemsVisible[index] }"
          mb="47px"
          :mt="shouldShowDate(index) ? '63px' : '0'"
          :data-index="index"
        >
          <RouterLink :to="post.path || ''" class="modern-link-wrapper">
            <h2 class="modern-post-title">
              {{ post.title }}
            </h2>
            <div class="modern-post-series" font-size-sm>
              <div v-if="post.excerpt" class="modern-post-excerpt" v-html="post.excerpt" />
            </div>
          </RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modern-scroll-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.modern-post-list {
  &-header {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition:
      opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
      transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

    @at-root html.dark & {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  &-title {
    &::before {
      content: '';
      display: inline-block;
      height: 20px;
      width: 5px;
      background: #000;
      border-radius: 2px;
      margin-right: 0.75rem;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @at-root html.dark & {
      &::before {
        background: #fff;
      }
    }
  }

  &-vertical-bar {
    height: 20px;
    width: 5px;
    background: #000;
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @at-root html.dark & {
    &-vertical-bar {
      background: #fff;
    }
  }
}

.modern-post-item {
  position: relative;
  transition:
    background-color 0.45s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.45s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: translateY(20px) scale(0.98);
  opacity: 0;

  &.item-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  a {
    color: inherit;
  }

  &:hover {
    background-color: #f9f9f9;
    transform: scale(1.01);

    @at-root html.dark & {
      background-color: #1a1a1a;
    }
  }

  &:active {
    transform: scale(0.99);
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.modern-link-wrapper {
  display: block;
  padding: 0.5rem 0.5rem 0.5rem 0;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-post-title {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 12pt;
  font-weight: bold;
  line-height: calc(12pt + 4px);
  margin-bottom: 15px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  a {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
  }
}

.modern-post-excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  min-height: calc(3 * 2em);
  line-height: 2em;
  transition: opacity 0.3s ease;

  .modern-post-item:hover & {
    opacity: 0.9;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
