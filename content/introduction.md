---
title: "Introduction to Hypi"
metaTitle: "Introduction to developing apps with Hypi"
metaDescription: "Introduces the concepts involved in building data driven apps on the Hypi platform"
---

**Before** getting started with Hypi, it's worth having a general understanding of the concepts involved in working with the platform.
The aim of this introduction is to get you familiar with these concepts.

## Realm
A  **realm is a namespace** for all your apps. This is used in URLs and cannot be changed  once created.

### Organisations
Name of your company/team/group/organisation. You can create as many organisations as you desire. But, there must be at least one organisation in a realm

If your organisation has a Hypi account / realm, please ask your administrator to add you as a member of the team. **Do not register separately; doing so will create an independent realm.**

## App
At the heart of everything in Hypi is the idea of an app.
Hypi uses the concept of an App to encapsulate a collection of models, serverless functions and any resources they need to serve their purpose.

An App can have data models written in GraphQL as well as other serverless functions written in JavaScript, Go, Java, Kotlin, Node.js, PHP, Python, Ruby, Scala & Shell.
Think of an app as a way to group related behaviour and resources (there is some similarity to a micro-service).

Within an app, you can further define a few things.
* **Release**
  * Schema
  * Dependencies
  * Fields
* **Instance**
  * Instance domain
  * Data (including permission/authorisation)
  * Monitoring/metrics
  * Logs

### Release

A release represents a version of your app. Each release can be used independently.
For example you could create three releases for the same app called `alpha`, `rc` and `prod-1`.
The alpha release can be used for development, the rc release for release candidates and prod for production.

### Schema
A schema in Hypi is a GraphQL data model which represents the model you want for your app.
In Hypi, everything about your app's API is controlled with the schema.

### Dependencies
Hypi allows an app to add one or more dependencies to other apps.
This feature promotes software reuse by enabling you to build small reusable apps that are added as dependencies in other apps.

### Fields & Settings
Fields in Hypi are key value pairs that allow you to define configuration options that an app needs.
On each release, you define one or more field and later populate values for those fields for each [instance](#instance) that you create.
Fields that you create in a release become accessible as a `$settings` variable so `$settings.fieldName` gives the value of the field called `fieldName`.
In some other systems, these are commonly known as "[environment variables](/products/axiom/environment-variables)".
### Instance
An instance is an isolated copy of your app.
Think of an app as a template and an instance as a deployed version of that template.
Every instance gets its own [domain](#instancedomain).

### Instance domain
Every instance must have a unique domain. By default Hypi will generate one based on its domain. You're free to use your own domain e.g. `api.my-domain.com`.

### Data
Instances are isolated, data created in once instance is not accessible by default from another instance and only someone with permission can grant access between instances.
