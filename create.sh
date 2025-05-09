#!/bin/bash

# Create directories
mkdir -p public
mkdir -p src/components/ui
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/pages
mkdir -p src/types

# Create files
touch public/placeholder.svg
touch public/robots.txt

touch src/App.css
touch src/App.tsx
touch src/index.css
touch src/main.tsx

touch src/components/BiasIndicatorExplanation.tsx
touch src/components/BiasScoreCard.tsx
touch src/components/Footer.tsx
touch src/components/Header.tsx
touch src/components/IndicatorBiasChart.tsx
touch src/components/Layout.tsx
touch src/components/ModelBiasChart.tsx
touch src/components/ScenarioPreview.tsx

touch src/components/ui/accordion.tsx
touch src/components/ui/alert-dialog.tsx
touch src/components/ui/alert.tsx
touch src/components/ui/aspect-ratio.tsx
touch src/components/ui/avatar.tsx
touch src/components/ui/badge.tsx
touch src/components/ui/breadcrumb.tsx
touch src/components/ui/button.tsx
touch src/components/ui/calendar.tsx
touch src/components/ui/card.tsx
touch src/components/ui/carousel.tsx
touch src/components/ui/chart.tsx
touch src/components/ui/checkbox.tsx
touch src/components/ui/collapsible.tsx
touch src/components/ui/command.tsx
touch src/components/ui/context-menu.tsx
touch src/components/ui/dialog.tsx
touch src/components/ui/drawer.tsx
touch src/components/ui/dropdown-menu.tsx
touch src/components/ui/form.tsx
touch src/components/ui/hover-card.tsx
touch src/components/ui/input-otp.tsx
touch src/components/ui/input.tsx
touch src/components/ui/label.tsx
touch src/components/ui/menubar.tsx
touch src/components/ui/navigation-menu.tsx
touch src/components/ui/pagination.tsx
touch src/components/ui/popover.tsx
touch src/components/ui/progress.tsx
touch src/components/ui/radio-group.tsx
touch src/components/ui/resizable.tsx
touch src/components/ui/scroll-area.tsx
touch src/components/ui/select.tsx
touch src/components/ui/separator.tsx
touch src/components/ui/sheet.tsx
touch src/components/ui/sidebar.tsx
touch src/components/ui/skeleton.tsx
touch src/components/ui/slider.tsx
touch src/components/ui/sonner.tsx
touch src/components/ui/switch.tsx
touch src/components/ui/table.tsx
touch src/components/ui/tabs.tsx
touch src/components/ui/textarea.tsx
touch src/components/ui/toast.tsx
touch src/components/ui/toaster.tsx
touch src/components/ui/toggle-group.tsx
touch src/components/ui/toggle.tsx
touch src/components/ui/tooltip.tsx

touch src/context/ScenarioContext.tsx

touch src/hooks/use-mobile.tsx
touch src/hooks/use-toast.ts

touch src/lib/utils.ts

touch src/pages/CreateScenario.tsx
touch src/pages/History.tsx
touch src/pages/Index.tsx
touch src/pages/ModelAlignmentReport.tsx
touch src/pages/NotFound.tsx
touch src/pages/Results.tsx

touch src/types/index.ts

touch .gitignore
touch components.json
touch eslint.config.js
touch index.html
touch package.json
touch postcss.config.js
touch README.md
touch tailwind.config.ts
touch tsconfig.app.json
touch tsconfig.json
touch tsconfig.node.json
touch vite.config.ts

echo "Folder and file structure created successfully!"