# Week 8: Brainstorm Final Project
**NASC 094: Adventures in Science: DTSC**

*Spring 2026*

---

## Goals

By the end of class, each group should have:
* one main topic,
* one focused question,
* one possible data source or example dataset,
* one method you can explain,
* and one limitation or caution to mention.

The final presentation should teach the class something interesting, not cover everything about a field.

---

## Final Presentation Reminder
Each group will give a 15 minute presentation:
* 10 minutes for the presentation,
* 5 minutes for questions and answers.

A strong presentation should include:
* the problem or scientific question,
* why the topic matters,
* what kind of data are used,
* what method or analysis could be used,
* what results or patterns people might look for,
* and what limitations or ethical issues should be considered.

---

## Topics From Homework 1
The submitted project proposal topics were:
* Epidemiology: outbreak forecasting and geospatial hotspot mapping.
* Health tech: wearable devices, noninvasive BCI data, and how health devices use data.
* Medical image classification with deep learning.
* Data visualization and decision-making.
* Predicting real-world patterns using regression or classification.



---

## From Topic to Project
A topic is broad.
A project needs a focused question.

Use this structure:
1. **Question:** What do you want to learn or explain?
2. **Data:** What observations, measurements, images, or records could answer the question?
3. **Method:** What statistical or data science tool could be used?
4. **Result:** What pattern, prediction, comparison, or visualization would be useful?
5. **Limitation:** What could go wrong, or what should the audience be careful about?

If you can answer these five parts, you have the skeleton of a final presentation.

---

## Topic 1: Outbreak Forecasting
This topic asks how data can help us understand and predict disease outbreaks.

Possible questions:
* Can past outbreak data help identify when or where future outbreaks may occur?
* Which locations appear to have higher outbreak risk?
* How can maps help public health officials see hotspots quickly?

Possible data:
* [CDC NORS data](https://www.cdc.gov/nors/data/) for foodborne, waterborne, and enteric disease outbreaks.
* [CDC PLACES](https://www.cdc.gov/places/) for local health indicators.
* [WHO Disease Outbreak News](https://www.who.int/emergencies/disease-outbreak-news) for examples of current outbreak reports.

---

## Methods for Outbreak Projects
Beginner-friendly methods:
* line plots showing outbreaks over time,
* bar charts comparing pathogens, locations, or settings,
* moving averages to smooth noisy counts,
* simple regression for trends,
* classification of higher-risk versus lower-risk areas,
* and maps or choropleth maps to show geographic patterns.

Important caution:
Outbreak data are not the same as all infections.
Some outbreaks are missed, underreported, or reported with delay, so the data do not show the full disease burden.

---

## Topic 2: Wearables and Noninvasive BCI
This topic asks how devices collect signals from the body and turn them into useful information.

Possible questions:
* Can phone or watch sensors classify human activity?
* What kinds of data do wearable health devices collect?
* How might brain-computer interface data be used without surgery?
* What privacy risks appear when devices constantly measure the body?

Possible data:
* [UCI Human Activity Recognition Using Smartphones](https://archive.ics.uci.edu/dataset/240) for accelerometer and gyroscope data.
* [UCI WISDM Smartphone and Smartwatch Activity and Biometrics](https://archive.ics.uci.edu/dataset/507/wisdm+smartphone+and+smartwatch+activity+and+biometrics+dataset) for phone and watch sensor data.
* PhysioNet datasets for physiological signals such as heart rate, motion, or sleep-related measurements.

---

## Methods for Wearable Projects
Beginner-friendly methods:
* summarize signals with means, ranges, and variability,
* compare sensor patterns across activities,
* classify activities such as walking, sitting, or standing,
* split data into training and test sets,
* report accuracy and a confusion matrix,
* and discuss why real-world sensor data can be noisy.

Important caution:
Wearable data can reveal sensitive information about health, routines, location, and behavior.
A good project should include privacy and consent, not only prediction accuracy.

---

## Topic 3: Medical Image Classification
This topic asks how computers can classify medical images and support clinical decisions.

Possible questions:
* Can an algorithm classify images into disease versus no disease?
* What kinds of mistakes matter most in medical diagnosis?
* How is image classification different from working with a spreadsheet?
* When should a model help a doctor rather than replace a doctor?

Possible data:
* [MedMNIST](https://medmnist.com/) for beginner-friendly biomedical image classification datasets.
* Published papers that report image classification results, even if your group does not train a model.

---

## Methods for Medical Image Projects
Beginner-friendly methods:
* explain image labels and training/test splits,
* compare examples of correctly and incorrectly classified images,
* report accuracy, sensitivity, and specificity,
* explain the idea of a convolutional neural network at a high level,
* and discuss false positives and false negatives.

Important caution:
High accuracy on one dataset does not mean the model will work in every hospital or patient population.
Medical image projects should discuss bias, generalization, and clinical responsibility.

---

## Topic 4: Data Visualization and Decision-Making
This topic asks how charts, graphs, maps, and dashboards affect what people notice and decide.

Possible questions:
* Which visualization makes a pattern easiest to understand?
* How can a bad chart mislead people?
* How can heatmaps or maps help decision-makers identify priorities?
* What makes a visualization useful rather than just attractive?

Possible data:
* CDC PLACES local health indicators.
* Transportation datasets such as bike sharing or taxi trip records.
* Campus, public health, environmental, or finance datasets with categories, time, or geography.

---

## Methods for Visualization Projects
Beginner-friendly methods:
* bar charts for group comparisons,
* line charts for changes over time,
* scatterplots for relationships between variables,
* heatmaps for two-way patterns,
* maps for geographic differences,
* and before-and-after comparisons of weak versus improved visualizations.

Important caution:
Visualization is not decoration.
Choices about color, scale, grouping, and labels can change the message the audience receives.

---

## Topic 5: Predicting Real-World Patterns
This topic asks how past data can help predict or classify future outcomes.

Possible questions:
* Can weather and time predict bike rental demand?
* Can traffic patterns predict busy hours or busy locations?
* Can sales data predict future demand?
* What variables are most useful for prediction?

Possible data:
* [UCI Bike Sharing](https://archive.ics.uci.edu/dataset/275) for hourly and daily bike rental counts.
* [NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) for taxi and for-hire vehicle trips.
* Public retail or sales datasets for demand prediction examples.

---

## Methods for Prediction Projects
Beginner-friendly methods:
* plot the outcome over time,
* compare weekdays and weekends,
* use linear regression for numeric outcomes,
* use classification for categories such as high demand versus low demand,
* compare predicted values with actual values,
* and report simple error measures.

Important caution:
Prediction is not magic.
Models can fail when the future is different from the past, when important variables are missing, or when the data are biased.

---


## Group Work
In your group, choose one topic and fill in this template:

1. **Topic:** What broad topic are you choosing?
2. **Question:** What focused question will your presentation answer?
3. **Motivation:** Why should the class care?
4. **Data:** What dataset, example, or type of data will you discuss?
5. **Method:** What method will you explain?
6. **Limitation:** What is one important caution?
7. **Visual:** What chart, table, image, or diagram will help the audience understand?

Think of the final project as a **Proposal**.

---

## Presentation Advice
A good final presentation should:
* start with a clear question,
* define unfamiliar terms,
* use one or two strong examples,
* show at least one visual,
* explain the data source,
* explain the method without too much technical detail,
* include limitations,
* and end with a takeaway the class can remember.

Avoid spending the whole presentation on background.
The audience should understand the data science part of the topic.

---

## Wrap-Up

Choosing One Focus: 

* our final topic is,
* our main question is,
* our example data source is,
* our proposed method is,
* and our biggest limitation or caution is.
