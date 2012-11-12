#fpJSErrorNotifierPlugin

## Overview

A symfony plugin that add ability to catch all kind of JavaScript errors and send them as an email.


## Requirements

* [Symfony](http://www.symfony-project.org) 1.1 - 1.4
* [fpErrorNotifierPlugin](https://github.com/66Ton99/fpErrorNotifierPlugin)


## Installation

### Install plugin

### Enable it


    class ProjectConfiguration extends sfProjectConfiguration
    {
      public function setup()
      {
        $this->enablePlugins('fpErrorNotifierPlugin');
      }
    }


### view.yml

    default:
      javascripts:
        <?php echo 'dev'==sfConfig::get('sf_environment')?"":"    - /fpJSErrorNotifierPlugin/js/fpJSErrorNotifier.js: { position: first }", "\n"?>

### settings.yml
    all:
      .settings:
        enabled_modules:
          - default
          - fpJSErrorNotifier
