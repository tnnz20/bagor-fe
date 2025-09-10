<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-vue-next";
</script>

<template>
  <section
    class="text-black pt-[200px] pb-20 absolute inset-0 -z-10 h-full w-full bg-white"
  >
    <div
      class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
    ></div>
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 text-balance">
        Penilaian Kinerja Lebih Cerdas, Cepat, dan Objektif.
      </h1>
      <p class="text-xl text-gray-[#100f14] mb-8 max-w-2xl mx-auto text-pretty">
        Streamline your workflow with our comprehensive task management solution
        that brings all your projects together in one place.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <button
          class="text-white bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Login
        </button>
      </div>

      <!-- Dashboard Mockup -->
      <div class="relative max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Panel -->
            <div class="lg:col-span-2">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">Expenses</h3>
                <div class="flex items-center space-x-2">
                  <span class="text-2xl font-bold">$$$</span>
                </div>
              </div>

              <!-- Chart Area -->
              <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <div
                  class="h-32 bg-gradient-to-r from-orange-200 to-orange-300 rounded-lg flex items-end justify-center"
                >
                  <div class="text-sm text-gray-600">Analytics Chart</div>
                </div>
              </div>

              <!-- Employee Status -->
              <div>
                <h4 class="font-semibold mb-4">Employee Status</h4>
                <div class="space-y-3">
                  <div
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <span>John Doe</span>
                    </div>
                    <span class="text-green-500 text-sm">Active</span>
                  </div>
                  <div
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-purple-500 rounded-full"></div>
                      <span>Jane Smith</span>
                    </div>
                    <span class="text-yellow-500 text-sm">Away</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel -->
            <div class="space-y-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold mb-3">Recent Activity</h4>
                <div class="space-y-2 text-sm text-gray-600">
                  <div>Task completed by John</div>
                  <div>New project created</div>
                  <div>Meeting scheduled</div>
                </div>
              </div>

              <div class="bg-orange-50 rounded-lg p-4">
                <h4 class="font-semibold mb-2">Quick Stats</h4>
                <div class="text-2xl font-bold text-orange-600">85%</div>
                <div class="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
