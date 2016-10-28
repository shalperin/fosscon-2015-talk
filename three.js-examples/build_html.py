#!/usr/local/bin/python

from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader('templates'))
import os

output_base_path = "."
ass1 = ["ST1", "ST2", "ST3", "OT1", "OT2"]
ass2 = ["HGG1", "HGG2", "HGG3", "HGG4", "HGG5"]
ass3 = ["SG1", "MC1", "MC2", "MC3", "MC4", "MC5"]
ass4 = ["C1", "BA1", "BA2", "MFWA1"]
project = []
extra = ["TorusFly"]

exercises = ass1 + ass2 + ass3 + ass4 + project + extra

for ex in exercises:
    output_path = os.path.join(output_base_path, "{}.html".format(ex))
    template = env.get_template("base.html")
    html = template.render(
        exercises=exercises,
        ass1=ass1,
        ass2=ass2,
        ass3=ass3,
        ass4=ass4,
        project=project,
        extra=extra,
        ex=ex
    )
    with open(output_path, 'w') as output:
        output.write(html)
