<script setup lang="ts">
import type { Post } from 'valaxy'
import { usePostList } from 'valaxy'
import { computed } from 'vue'

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
</script>

<template>
  <div w="md:19.37vw" max-h-100vh overflow-y-auto>
    <div class="modern-post-list px-59px">
      <template v-for="(post, index) in posts" :key="post.path">
        <div v-if="shouldShowDate(index)" top="0" left="0" class="modern-post-list-header" sticky>
          <div relative h="63px" w="md:15.5vw" ml-auto>
            <div absolute bottom="0" left="0">
              <div flex items-center text-xl font-bold class="modern-post-list-title">
                {{ formatDate(post.date) }}
              </div>
            </div>
          </div>
        </div>

        <div w="md:15.5vw" ml-auto class="modern-post-item" mb="47px" :mt="shouldShowDate(index) ? '63px' : '0'">
          <RouterLink :to="post.path || ''">
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
.modern-post-list {
  &-header {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

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
  }

  @at-root html.dark & {
    &-vertical-bar {
      background: #fff;
    }
  }
}

.modern-post-item {
  transition: background-color 0.2s;

  a {
    color: inherit;
  }

  &:hover {
    background-color: #f9f9f9;

    @at-root html.dark & {
      background-color: #1a1a1a;
    }
  }
}

.modern-post-title {
  font-family: 'Microsoft YaHei', sans-serif;
  font-size: 12pt;
  font-weight: bold;
  line-height: calc(12pt + 4px);
  margin-bottom: 15px;

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
}
</style>
