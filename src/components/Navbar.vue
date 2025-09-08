<template>
  <section class="py-4">
    <div class="w-full px-32">
      <nav class="flex items-center justify-between">
        <a href="#" class="flex items-center gap-2">
          <span class="text-lg font-semibold tracking-tighter"> LOGO </span>
        </a>

        <!-- Desktop Navigation -->
        <NavigationMenu class="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid w-[600px] grid-cols-2 p-3">
                  <NavigationMenuLink
                    v-for="(feature, index) in features"
                    :key="index"
                    :href="feature.href"
                    class="rounded-md p-3 transition-colors hover:bg-muted/70"
                  >
                    <div>
                      <p class="mb-1 font-semibold text-foreground">
                        {{ feature.title }}
                      </p>
                      <p class="text-sm text-muted-foreground">
                        {{ feature.description }}
                      </p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                :class="navigationMenuTriggerStyle()"
              >
                Products
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                :class="navigationMenuTriggerStyle()"
              >
                Resources
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                :class="navigationMenuTriggerStyle()"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <!-- Desktop Buttons -->
        <div class="hidden items-center gap-4 lg:flex">
          <Button as-child>
            <a href="/login"> Login </a>
          </Button>
        </div>

        <!-- Mobile Menu -->
        <Sheet v-model:open="isSheetOpen">
          <SheetTrigger as-child class="lg:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon class="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" class="max-h-screen overflow-auto">
            <SheetHeader>
              <SheetTitle>
                <a href="#" class="flex items-center gap-2">
                  <span class="text-lg font-semibold tracking-tighter">
                    LOGO
                  </span>
                </a>
              </SheetTitle>
            </SheetHeader>
            <div class="flex flex-col p-4">
              <Accordion type="single" collapsible class="mt-4 mb-2">
                <AccordionItem value="solutions" class="border-none">
                  <AccordionTrigger class="text-base hover:no-underline">
                    Features
                  </AccordionTrigger>
                  <AccordionContent>
                    <div class="grid md:grid-cols-2">
                      <a
                        v-for="(feature, index) in features"
                        :key="index"
                        :href="feature.href"
                        class="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p class="mb-1 font-semibold text-foreground">
                            {{ feature.title }}
                          </p>
                          <p class="text-sm text-muted-foreground">
                            {{ feature.description }}
                          </p>
                        </div>
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div class="flex flex-col gap-6">
                <a href="#" class="font-medium">Templates</a>
                <a href="#" class="font-medium">Blog</a>
                <a href="#" class="font-medium">Pricing</a>
              </div>
              <div class="mt-6 flex flex-col gap-4">
                <Button as-child>
                  <a href="/login"> Login </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MenuIcon } from "lucide-vue-next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// State untuk mengontrol mobile sheet
const isSheetOpen = ref(false);

// Data features
const features = [
  {
    title: "Dashboard",
    description: "Overview of your activity",
    href: "#",
  },
  {
    title: "Analytics",
    description: "Track your performance",
    href: "#",
  },
  {
    title: "Settings",
    description: "Configure your preferences",
    href: "#",
  },
  {
    title: "Integrations",
    description: "Connect with other tools",
    href: "#",
  },
  {
    title: "Storage",
    description: "Manage your files",
    href: "#",
  },
  {
    title: "Support",
    description: "Get help when needed",
    href: "#",
  },
];
</script>
