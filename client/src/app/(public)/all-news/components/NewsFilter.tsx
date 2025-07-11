"use client";
import { Input, DatePicker, Select, Row, Col } from "antd";
import dayjs from "dayjs";
import { TNewsParams } from "@/services/news/types";
const { RangePicker } = DatePicker;

type Props = {
  filter: TNewsParams;
  onChange: (newFilter: TNewsParams) => void;
  sourceOptions: { label: string; value: string }[];
};

export default function NewsFilter({ filter, onChange, sourceOptions }: Props) {
  return (
    <div className="mb-5">
      <Row gutter={[16, 16]}>
        <Col span={24} md={12} lg={6}>
          <Input.Search
            placeholder="Search news"
            allowClear
            enterButton
            value={filter.q || ""}
            onChange={(e) => onChange({ ...filter, q: e.target.value })}
          />
        </Col>

        <Col span={24} md={12} lg={6}>
          <RangePicker
            value={
              filter.from && filter.to
                ? [dayjs(filter.from), dayjs(filter.to)]
                : null
            }
            onChange={(dates) => {
              if (dates) {
                onChange({
                  ...filter,
                  from: dates?.[0]?.format("YYYY-MM-DD"),
                  to: dates?.[1]?.format("YYYY-MM-DD"),
                });
              } else {
                onChange({ ...filter, from: null, to: null });
              }
            }}
          />
        </Col>

        <Col span={24} md={12} lg={6}>
          <Select
            placeholder="Select source"
            allowClear
            value={filter.source || undefined}
            options={sourceOptions}
            onChange={(val) => onChange({ ...filter, source: val || null })}
            style={{ width: "100%" }}
          />
        </Col>

        <Col span={24} md={12} lg={6}>
          <Select
            placeholder="Sort by"
            value={filter.sortBy}
            options={[
              { label: "Published At", value: "publishedAt" },
              { label: "Relevancy", value: "relevancy" },
              { label: "Popularity", value: "popularity" },
            ]}
            onChange={(val) => onChange({ ...filter, sortBy: val })}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
}
