#!/usr/bin/env python3

import sys
import argparse
from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap
import json
import cloudmesh_faker

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate fake data for input YAML file')
    parser.add_argument('--yaml-file', dest='read_file', help="read yaml file", metavar="FILE")
    parser.add_argument('--out-file', dest='out_file', help="output file name (Don't provide extension)", metavar="FILE")
    parser.add_argument('--json', dest="write_json", action='store_const', const=True, help="output JSON file")
    parser.add_argument('--yaml', dest="write_yaml", action='store_const' , const=True, help="output YAML file")

    args = parser.parse_args()
    
    yaml = YAML(typ='safe')
    yaml.default_flow_style = False
    read_file = open(args.read_file, 'r');
    yaml_obj = yaml.load(read_file)
    read_file.close()

    for definition in yaml_obj['definitions']:
        for _property in yaml_obj['definitions'][definition]['properties']:
            if('x-faker' in yaml_obj['definitions'][definition]['properties'][_property]):
                yaml_obj['definitions'][definition]['properties'][_property]['value'] = eval(yaml_obj['definitions'][definition]['properties'][_property]['x-faker'])
    
    if args.write_yaml:
        write_file = open(args.out_file+'.yml', 'w')
        yaml.dump(yaml_obj, write_file)
        write_file.close()
    
    if args.write_json:
        write_file = open(args.out_file+'.json', 'w')
        json.dump(yaml_obj, write_file)
        write_file.close()
