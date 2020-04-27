<template>
  <div v-if="!item.hidden">
    <template v-if="onlyOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <q-item v-if="onlyOneChild.meta" class="sidebar-item" v-ripple clickable :to="resolvePath(onlyOneChild.path)">
        <q-item-section avatar>
          <q-icon :name="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ onlyOneChild.meta.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-else>
      <q-expansion-item
        expand-separator
        :icon="item.meta.icon"
        :label="item.meta.title"
      >
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
      </q-expansion-item>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  computed: {},
  methods: {
    onlyOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
  color: currentColor;

  .q-item__section--avatar {
    .q-icon {
      color: #5f6368;
    }
  }

  .q-item__label {
    color: #3c4043;
    letter-spacing: .01785714em;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }
}
</style>
